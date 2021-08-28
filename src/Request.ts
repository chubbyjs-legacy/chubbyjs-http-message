import MessageInterface from '@chubbyjs/psr-http-message/dist/MessageInterface';
import RequestInterface from '@chubbyjs/psr-http-message/dist/RequestInterface';
import UriInterface from '@chubbyjs/psr-http-message/dist/UriInterface';
import { Duplex } from 'stream';
import Message from './Message';
import Uri from './Uri';

class Request implements RequestInterface {
    public constructor(
        private requestTarget: string = '',
        private method: string = 'GET',
        private uri: UriInterface = new Uri(),
        private message: MessageInterface = new Message(),
    ) {}

    public getRequestTarget(): string {
        return this.requestTarget;
    }

    public withRequestTarget(requestTarget: string): this {
        const request = this.clone();
        request.requestTarget = requestTarget;

        return request;
    }

    public getMethod(): string {
        return this.method;
    }

    public withMethod(name: string): this {
        const request = this.clone();
        request.method = name;

        return request;
    }

    public getUri(): UriInterface {
        return this.uri;
    }

    public withUri(uri: UriInterface, preserveHost: boolean = false): this {
        const host = uri.getHost();

        const request = this.clone();

        if (
            host !== '' &&
            (!preserveHost || !this.message.hasHeader('Host') || this.message.getHeaderLine('Host') === '')
        ) {
            request.message = request.message.withHeader('Host', host);
        }

        if (this.requestTarget === '') {
            request.requestTarget = this.uriToRequestTarget(uri);
        }

        request.uri = uri;

        return request;
    }

    public getProtocolVersion(): string {
        return this.message.getProtocolVersion();
    }

    public withProtocolVersion(protocolVersion: string): this {
        const request = this.clone();
        request.message = this.message.withProtocolVersion(protocolVersion);

        return request;
    }

    public getHeaders(): Map<string, Array<string>> {
        return this.message.getHeaders();
    }

    public hasHeader(name: string): boolean {
        return this.message.hasHeader(name);
    }

    public getHeader(name: string): Array<string> {
        return this.message.getHeader(name);
    }

    public getHeaderLine(name: string): string {
        return this.message.getHeaderLine(name);
    }

    public withHeader(name: string, value: Array<string> | string): this {
        const request = this.clone();
        request.message = this.message.withHeader(name, value);

        return request;
    }

    public withAddedHeader(name: string, value: Array<string> | string): this {
        const request = this.clone();
        request.message = this.message.withAddedHeader(name, value);

        return request;
    }

    public withoutHeader(name: string): this {
        const request = this.clone();
        request.message = this.message.withoutHeader(name);

        return request;
    }

    public getBody(): Duplex {
        return this.message.getBody();
    }

    public withBody(body: Duplex): this {
        const request = this.clone();
        request.message = this.message.withBody(body);

        return request;
    }

    public getMessage(): MessageInterface {
        return this.message;
    }

    private clone(): this {
        return Object.assign(new Request(), this);
    }

    private uriToRequestTarget(uri: UriInterface): string {
        const path = uri.getPath();
        const query = uri.getQuery();
        const fragment = uri.getFragment();

        return path + (query !== '' ? '?' + query : '') + (fragment !== '' ? '#' + fragment : '');
    }
}

export default Request;
