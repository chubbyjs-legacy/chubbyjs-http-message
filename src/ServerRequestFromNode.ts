import ServerRequestFactoryInterface from '@chubbyjs/psr-http-factory/dist/ServerRequestFactoryInterface';
import UriFactoryInterface from '@chubbyjs/psr-http-factory/dist/UriFactoryInterface';
import ServerRequestInterface, { QueryParams } from '@chubbyjs/psr-http-message/dist/ServerRequestInterface';
import { parse as cookieParser } from 'cookie';
import { parse as queryParser } from 'qs';
import { Duplex, PassThrough } from 'stream';

type HttpRequest = {
    httpVersion: string;
    method?: string;
    url?: string;
    headers: {
        host?: string;
        cookie?: string;
    };
    pipe: (destination: Duplex) => Duplex;
};

class ServerRequestFromNode {
    public constructor(
        private serverRequestFactory: ServerRequestFactoryInterface,
        private uriFactory: UriFactoryInterface,
    ) {}

    public create(httpRequest: HttpRequest): ServerRequestInterface {
        if (!httpRequest.method || !httpRequest.url) {
            throw new Error('Request is not a server request');
        }

        const uri = this.uriFactory.createUri('http://' + (httpRequest.headers.host ?? 'localhost') + httpRequest.url);

        let serverRequest = this.serverRequestFactory
            .createServerRequest(httpRequest.method.toUpperCase(), uri)
            .withCookieParams(
                httpRequest.headers.cookie
                    ? new Map(Object.entries(cookieParser(httpRequest.headers.cookie)))
                    : new Map(),
            )
            .withQueryParams(this.queryParamsFromParsedQuery(queryParser(uri.getQuery())) as Map<string, QueryParams>)
            .withBody(httpRequest.pipe(new PassThrough()));

        Object.entries(httpRequest.headers).forEach(([name, value]) => {
            if (!value) {
                return;
            }

            serverRequest = serverRequest.withHeader(name, value);
        });

        return serverRequest;
    }

    private queryParamsFromParsedQuery(value: any): QueryParams {
        if (Array.isArray(value)) {
            return value.map(this.queryParamsFromParsedQuery);
        }

        if (value && typeof value === 'object' && value.constructor === Object) {
            return new Map(
                Object.entries(value).map(([key, subValue]) => [key, this.queryParamsFromParsedQuery(subValue)]),
            );
        }

        return value;
    }
}

export default ServerRequestFromNode;
