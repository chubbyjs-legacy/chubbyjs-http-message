import MessageInterface from '@chubbyjs/psr-http-message/dist/MessageInterface';
import { Duplex, PassThrough } from 'stream';

class Message implements MessageInterface {
    private headerEntries: Map<string, { name: string; value: Array<string> }> = new Map();

    public constructor(
        private protocolVersion: string = '1.1',
        headers: Map<string, Array<string> | string> = new Map(),
        private body: Duplex = new PassThrough(),
    ) {
        headers.forEach((value, name) => {
            this.headerEntries.set(name.toLowerCase(), { name, value: this.mapHeaderValue(value) });
        });
    }

    public getProtocolVersion(): string {
        return this.protocolVersion;
    }

    public withProtocolVersion(protocolVersion: string): this {
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

    public withHeader(name: string, value: Array<string> | string): this {
        const headerEntries = new Map(this.headerEntries);
        headerEntries.set(name.toLowerCase(), { name, value: this.mapHeaderValue(value) });

        const message = this.clone();
        message.headerEntries = headerEntries;

        return message;
    }

    public withAddedHeader(name: string, value: Array<string> | string): this {
        return this.withHeader(name, [...this.getHeader(name), ...this.mapHeaderValue(value)]);
    }

    public withoutHeader(name: string): this {
        const headerEntries = new Map(this.headerEntries);
        headerEntries.delete(name.toLowerCase());

        const message = this.clone();
        message.headerEntries = headerEntries;

        return message;
    }

    public getBody(): Duplex {
        return this.body;
    }

    public withBody(body: Duplex): this {
        const message = this.clone();
        message.body = body;

        return message;
    }

    private clone(): this {
        return Object.assign(new Message(), this);
    }

    private mapHeaderValue(value: Array<string> | string): Array<string> {
        return Array.isArray(value) ? value : value.split(',').map((subValue) => subValue.trim());
    }
}

export default Message;
