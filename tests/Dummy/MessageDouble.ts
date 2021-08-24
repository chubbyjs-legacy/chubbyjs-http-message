import MessageInterface from '@chubbyjs/psr-http-message/dist/MessageInterface';
import { Duplex } from 'stream';

class MessageDouble implements MessageInterface {
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

export default MessageDouble;
