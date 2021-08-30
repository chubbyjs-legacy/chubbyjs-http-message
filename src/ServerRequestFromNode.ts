import { QueryParams } from '@chubbyjs/psr-http-message/dist/ServerRequestInterface';
import { parse as cookieParser } from 'cookie';
import { IncomingMessage } from 'http';
import { parse as queryParser } from 'qs';
import { PassThrough } from 'stream';
import Message from './Message';
import Request from './Request';
import ServerRequest from './ServerRequest';
import Uri from './Uri';

class ServerRequestFromNode {
    public create(req: IncomingMessage): ServerRequest {
        if (!req.method || !req.url) {
            throw new Error('Request is not a server request');
        }

        const uri: Uri = Uri.fromString('http://' + (req.headers.host ?? 'localhost') + req.url);

        return new ServerRequest(
            req.headers.cookie ? new Map(Object.entries(cookieParser(req.headers.cookie))) : new Map(),
            this.queryParamsFromParsedQuery(queryParser(uri.getQuery())) as Map<string, QueryParams>,
            undefined,
            new Map(),
            new Request(
                this.uriToRequestTarget(uri),
                req.method.toUpperCase(),
                uri,
                new Message(
                    req.httpVersion,
                    this.incomingHeadersToHeaderEntries(req.headers),
                    req.pipe(new PassThrough())
                )
            )
        );
    }

    private queryParamsFromParsedQuery(value: any): QueryParams {
        if (Array.isArray(value)) {
            return value.map(this.queryParamsFromParsedQuery);
        }

        if (value && typeof value === 'object' && value.constructor === Object) {
            return new Map(Object.entries(value).map(([key, subValue]) => ([key, this.queryParamsFromParsedQuery(subValue)])));
        }

        return value;
    }

    private uriToRequestTarget(uri: Uri): string {
        const path = uri.getPath();
        const query = uri.getQuery();
        const fragment = uri.getFragment();

        return path + (query !== '' ? '?' + query : '') + (fragment !== '' ? '#' + fragment : '');
    }

    private incomingHeadersToHeaderEntries(incomingHeaders: { [header: string]: string | string[] | undefined; }) {
        const headerEntries: Map<string, { name: string; value: Array<string>; }> = new Map();

        Object.entries(incomingHeaders)
            .forEach(([name, value]) => {
                if (!value) {
                    return;
                }

                if (Array.isArray(value)) {
                    headerEntries.set(name.toLowerCase(), { name, value });
                    return;
                }

                headerEntries.set(name.toLowerCase(), { name, value: value.split(',').map((valuePart) => valuePart.trim()) });
            });

        return headerEntries;
    }
}

export default ServerRequestFromNode;
