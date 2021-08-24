import MessageInterface from '@chubbyjs/psr-http-message/dist/MessageInterface';
import RequestInterface from '@chubbyjs/psr-http-message/dist/RequestInterface';
import UriInterface from '@chubbyjs/psr-http-message/dist/UriInterface';
import { Duplex } from 'stream';

class RequestDouble implements RequestInterface {
    getRequestTarget(): string {
        throw new Error('Method not implemented.');
    }
    withRequestTarget(requestTarget: string): RequestInterface {
        throw new Error('Method not implemented.');
    }
    getMethod(): string {
        throw new Error('Method not implemented.');
    }
    withMethod(name: string): RequestInterface {
        throw new Error('Method not implemented.');
    }
    getUri(): UriInterface {
        throw new Error('Method not implemented.');
    }
    withUri(uri: UriInterface, preserveHost?: boolean): RequestInterface {
        throw new Error('Method not implemented.');
    }
    getProtocolVersion(): string {
        throw new Error('Method not implemented.');
    }
    withProtocolVersion(version: string): MessageInterface {
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
    withHeader(name: string, value: string | string[]): MessageInterface {
        throw new Error('Method not implemented.');
    }
    withAddedHeader(name: string, value: string | string[]): MessageInterface {
        throw new Error('Method not implemented.');
    }
    withoutHeader(name: string): MessageInterface {
        throw new Error('Method not implemented.');
    }
    getBody(): Duplex {
        throw new Error('Method not implemented.');
    }
    withBody(body: Duplex): MessageInterface {
        throw new Error('Method not implemented.');
    }
}

export default RequestDouble;
