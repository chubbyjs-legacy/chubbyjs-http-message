import RequestInterface, { Method } from '@chubbyjs/psr-http-message/dist/RequestInterface';
import UriInterface from '@chubbyjs/psr-http-message/dist/UriInterface';
import { Duplex } from 'stream';

class RequestDouble implements RequestInterface {
    getRequestTarget(): string {
        throw new Error('Method not implemented.');
    }
    withRequestTarget(requestTarget: string): this {
        throw new Error('Method not implemented.');
    }
    getMethod(): Method {
        throw new Error('Method not implemented.');
    }
    withMethod(name: Method): this {
        throw new Error('Method not implemented.');
    }
    getUri(): UriInterface {
        throw new Error('Method not implemented.');
    }
    withUri(uri: UriInterface, preserveHost?: boolean): this {
        throw new Error('Method not implemented.');
    }
    getProtocolVersion(): string {
        throw new Error('Method not implemented.');
    }
    withProtocolVersion(version: string): this {
        throw new Error('Method not implemented.');
    }
    getHeaders(): Map<string, string[]> {
        throw new Error('Method not implemented.');
    }
    hasHeader(name: string): boolean {
        throw new Error('Method not implemented.');
    }
    getHeader(name: string): string[] {
        throw new Error('Method not implemented.');
    }
    getHeaderLine(name: string): string {
        throw new Error('Method not implemented.');
    }
    withHeader(name: string, value: string | string[]): this {
        throw new Error('Method not implemented.');
    }
    withAddedHeader(name: string, value: string | string[]): this {
        throw new Error('Method not implemented.');
    }
    withoutHeader(name: string): this {
        throw new Error('Method not implemented.');
    }
    getBody(): Duplex {
        throw new Error('Method not implemented.');
    }
    withBody(body: Duplex): this {
        throw new Error('Method not implemented.');
    }
}

export default RequestDouble;
