import { QueryParams } from '@chubbyjs/psr-http-message/dist/ServerRequestInterface';
import { parse as cookieParser } from 'cookie';
import { parse as queryParser } from 'qs';
import { Duplex, PassThrough } from 'stream';
import Message from './Message';
import Request from './Request';
import ServerRequest from './ServerRequest';
import Uri from './Uri';

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
    public create(httpRequest: HttpRequest): ServerRequest {
        if (!httpRequest.method || !httpRequest.url) {
            throw new Error('Request is not a server request');
        }

        const uri: Uri = Uri.fromString('http://' + (httpRequest.headers.host ?? 'localhost') + httpRequest.url);

        return new ServerRequest(
            httpRequest.headers.cookie ? new Map(Object.entries(cookieParser(httpRequest.headers.cookie))) : new Map(),
            this.queryParamsFromParsedQuery(queryParser(uri.getQuery())) as Map<string, QueryParams>,
            undefined,
            new Map(),
            new Request(
                this.uriToRequestTarget(uri),
                httpRequest.method.toUpperCase(),
                uri,
                new Message(
                    httpRequest.httpVersion,
                    this.incomingHeadersToHeaders(httpRequest.headers),
                    httpRequest.pipe(new PassThrough()),
                ),
            ),
        );
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

    private uriToRequestTarget(uri: Uri): string {
        const path = uri.getPath();
        const query = uri.getQuery();
        const fragment = uri.getFragment();

        return path + (query !== '' ? '?' + query : '') + (fragment !== '' ? '#' + fragment : '');
    }

    private incomingHeadersToHeaders(incomingHeaders: {
        [header: string]: string | string[] | undefined;
    }): Map<string, Array<string> | string> {
        const headers: Map<string, Array<string> | string> = new Map();

        Object.entries(incomingHeaders).forEach(([name, value]) => {
            if (!value) {
                return;
            }

            headers.set(name, value);
        });

        return headers;
    }
}

export default ServerRequestFromNode;
