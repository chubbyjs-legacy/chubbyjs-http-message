import RequestInterface from '@chubbyjs/psr-http-message/dist/RequestInterface';
import ServerRequestInterface, {
    ParsedBody,
    QueryParams,
} from '@chubbyjs/psr-http-message/dist/ServerRequestInterface';
import UriInterface from '@chubbyjs/psr-http-message/dist/UriInterface';
import { Duplex } from 'stream';
import Request from './Request';

class ServerRequest implements ServerRequestInterface {
    public constructor(
        private cookieParams: Map<string, string> = new Map(),
        private queryParams: QueryParams = new Map(),
        private parsedBody: ParsedBody | undefined = undefined,
        private attributes: Map<string, unknown> = new Map(),
        private request: RequestInterface = new Request(),
    ) {}

    public getCookieParams(): Map<string, string> {
        return new Map(this.cookieParams);
    }

    public withCookieParams(cookieParams: Map<string, string>): ServerRequest {
        const serverRequest = this.clone();
        serverRequest.cookieParams = cookieParams;

        return serverRequest;
    }

    public getQueryParams(): QueryParams {
        return new Map(this.queryParams);
    }

    public withQueryParams(queryParams: QueryParams): ServerRequest {
        const serverRequest = this.clone();
        serverRequest.queryParams = queryParams;

        return serverRequest;
    }

    public getParsedBody(): ParsedBody | undefined {
        return this.parsedBody;
    }

    public withParsedBody(parsedBody: ParsedBody | undefined): ServerRequest {
        const serverRequest = this.clone();
        serverRequest.parsedBody = parsedBody;

        return serverRequest;
    }

    public getAttributes(): Map<string, unknown> {
        return new Map(this.attributes);
    }

    public getAttribute(name: string, defaultValue?: unknown): unknown {
        return this.attributes.has(name) ? this.attributes.get(name) : defaultValue;
    }

    public withAttribute(name: string, value: unknown): ServerRequest {
        const attributes = new Map(this.attributes);
        attributes.set(name, value);

        const serverRequest = this.clone();
        serverRequest.attributes = attributes;

        return serverRequest;
    }

    public withoutAttribute(name: string): ServerRequest {
        const attributes = new Map(this.attributes);
        attributes.delete(name);

        const serverRequest = this.clone();
        serverRequest.attributes = attributes;

        return serverRequest;
    }

    public getRequestTarget(): string {
        return this.request.getRequestTarget();
    }

    public withRequestTarget(requestTarget: string): ServerRequest {
        const serverRequest = this.clone();
        serverRequest.request = this.request.withRequestTarget(requestTarget);

        return serverRequest;
    }

    public getMethod(): string {
        return this.request.getMethod();
    }

    public withMethod(name: string): ServerRequest {
        const serverRequest = this.clone();
        serverRequest.request = this.request.withMethod(name);

        return serverRequest;
    }

    public getUri(): UriInterface {
        return this.request.getUri();
    }

    public withUri(uri: UriInterface, preserveHost: boolean = false): ServerRequest {
        const serverRequest = this.clone();
        serverRequest.request = this.request.withUri(uri, preserveHost);

        return serverRequest;
    }

    public getProtocolVersion(): string {
        return this.request.getProtocolVersion();
    }

    public withProtocolVersion(protocolVersion: string): ServerRequest {
        const serverRequest = this.clone();
        serverRequest.request = this.request.withProtocolVersion(protocolVersion) as RequestInterface;

        return serverRequest;
    }

    public getHeaders(): Map<string, Array<string>> {
        return this.request.getHeaders();
    }

    public hasHeader(name: string): boolean {
        return this.request.hasHeader(name);
    }

    public getHeader(name: string): Array<string> {
        return this.request.getHeader(name);
    }

    public getHeaderLine(name: string): string {
        return this.request.getHeaderLine(name);
    }

    public withHeader(name: string, value: Array<string> | string): ServerRequest {
        const serverRequest = this.clone();
        serverRequest.request = this.request.withHeader(name, value) as RequestInterface;

        return serverRequest;
    }

    public withAddedHeader(name: string, value: Array<string> | string): ServerRequest {
        const serverRequest = this.clone();
        serverRequest.request = this.request.withAddedHeader(name, value) as RequestInterface;

        return serverRequest;
    }

    public withoutHeader(name: string): ServerRequest {
        const serverRequest = this.clone();
        serverRequest.request = this.request.withoutHeader(name) as RequestInterface;

        return serverRequest;
    }

    public getBody(): Duplex {
        return this.request.getBody();
    }

    public withBody(body: Duplex): ServerRequest {
        const serverRequest = this.clone();
        serverRequest.request = this.request.withBody(body) as RequestInterface;

        return serverRequest;
    }

    public getRequest(): RequestInterface {
        return this.request;
    }

    private clone(): ServerRequest {
        return Object.assign(new ServerRequest(), this);
    }
}

export default ServerRequest;