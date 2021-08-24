import MessageInterface from '@chubbyjs/psr-http-message/dist/MessageInterface';
import { Duplex, PassThrough } from 'stream';

class Message implements MessageInterface {
    public constructor(
        private protocolVersion: string = '1.1',
        private headerEntries: Map<string, { name: string; value: Array<string> }> = new Map(),
        private body: Duplex = new PassThrough(),
    ) {}

    public getProtocolVersion(): string {
        return this.protocolVersion;
    }

    public withProtocolVersion(protocolVersion: string): Message {
        const message = this.clone();
        message.protocolVersion = protocolVersion;

        return message;
    }

    public getHeaders(): Map<string, Array<string>> {
        return new Map(Array.from(this.headerEntries.values()).map((entry) => [entry.name, entry.value]));
    }

    public hasHeader(name: string): boolean {
        return this.headerEntries.has(name.toLowerCase());
    }

    public getHeader(name: string): Array<string> {
        const entry = this.headerEntries.get(name.toLowerCase());

        if (entry === undefined) {
            return [];
        }

        return entry.value;
    }

    public getHeaderLine(name: string): string {
        return this.getHeader(name).join(', ');
    }

    public withHeader(name: string, value: Array<string> | string): Message {
        const headerEntries = new Map(this.headerEntries);
        headerEntries.set(name.toLowerCase(), { name, value: Array.isArray(value) ? value : [value] });

        const message = this.clone();
        message.headerEntries = headerEntries;

        return message;
    }

    public withAddedHeader(name: string, value: Array<string> | string): Message {
        return this.withHeader(name, [...this.getHeader(name), ...(Array.isArray(value) ? value : [value])]);
    }

    public withoutHeader(name: string): Message {
        const headerEntries = new Map(this.headerEntries);
        headerEntries.delete(name.toLowerCase());

        const message = this.clone();
        message.headerEntries = headerEntries;

        return message;
    }

    public getBody(): Duplex {
        return this.body;
    }

    public withBody(body: Duplex): Message {
        const message = this.clone();
        message.body = body;

        return message;
    }

    private clone(): Message {
        return Object.assign(new Message(), this);
    }
}

export default Message;
