import MessageInterface from '@chubbyjs/psr-http-message/dist/MessageInterface';
import ResponseInterface from '@chubbyjs/psr-http-message/dist/ResponseInterface';
import { Duplex } from 'stream';
import Message from './Message';

class Response implements ResponseInterface {
    private static statusCodeMap: Map<number, string> = new Map([
        [100, 'Continue'],
        [101, 'Switching Protocols'],
        [102, 'Processing'],
        [103, 'Early Hints'],
        [110, 'Response is Stale'],
        [111, 'Revalidation Failed'],
        [112, 'Disconnected Operation'],
        [113, 'Heuristic Expiration'],
        [199, 'Miscellaneous Warning'],
        [200, 'OK'],
        [201, 'Created'],
        [202, 'Accepted'],
        [203, 'Non-Authoritative Information'],
        [204, 'No Content'],
        [205, 'Reset Content'],
        [206, 'Partial Content'],
        [207, 'Multi-Status'],
        [208, 'Already Reported'],
        [214, 'Transformation Applied'],
        [226, 'IM Used'],
        [299, 'Miscellaneous Persistent Warning'],
        [300, 'Multiple Choices'],
        [301, 'Moved Permanently'],
        [302, 'Found'],
        [303, 'See Other'],
        [304, 'Not Modified'],
        [305, 'Use Proxy'],
        [306, 'Switch Proxy'],
        [307, 'Temporary Redirect'],
        [308, 'Permanent Redirect'],
        [400, 'Bad Request'],
        [401, 'Unauthorized'],
        [402, 'Payment Required'],
        [403, 'Forbidden'],
        [404, 'Not Found'],
        [405, 'Method Not Allowed'],
        [406, 'Not Acceptable'],
        [407, 'Proxy Authentication Required'],
        [408, 'Request Timeout'],
        [409, 'Conflict'],
        [410, 'Gone'],
        [411, 'Length Required'],
        [412, 'Precondition Failed'],
        [413, 'Payload Too Large'],
        [414, 'URI Too Long'],
        [415, 'Unsupported Media Type'],
        [416, 'Range Not Satisfiable'],
        [417, 'Expectation Failed'],
        [418, "I'm a teapot"],
        [421, 'Misdirected Request'],
        [422, 'Unprocessable Entity'],
        [423, 'Locked'],
        [424, 'Failed Dependency'],
        [425, 'Too Early'],
        [426, 'Upgrade Required'],
        [428, 'Precondition Required'],
        [429, 'Too Many Requests'],
        [431, 'Request Header Fields Too Large'],
        [451, 'Unavailable For Legal Reasons'],
        [500, 'Internal Server Error'],
        [501, 'Not Implemented'],
        [502, 'Bad Gateway'],
        [503, 'Service Unavailable'],
        [504, 'Gateway Timeout'],
        [505, 'HTTP Version Not Supported'],
        [506, 'Variant Also Negotiates'],
        [507, 'Insufficient Storage'],
        [508, 'Loop Detected'],
        [510, 'Not Extended'],
        [511, 'Network Authentication Required'],
    ]);

    private reasonPhrase: string;

    public constructor(
        private statusCode: number = 200,
        reasonPhrase: string | undefined = undefined,
        private message: MessageInterface = new Message(),
    ) {
        this.reasonPhrase = reasonPhrase ?? Response.statusCodeMap.get(statusCode) ?? '';
    }

    public getStatusCode(): number {
        return this.statusCode;
    }

    public withStatus(code: number, reasonPhrase?: string): this {
        const response = this.clone();
        response.statusCode = code;
        response.reasonPhrase = reasonPhrase ?? Response.statusCodeMap.get(code) ?? '';

        return response;
    }

    public getReasonPhrase(): string {
        return this.reasonPhrase;
    }

    public getProtocolVersion(): string {
        return this.message.getProtocolVersion();
    }

    public withProtocolVersion(protocolVersion: string): this {
        const response = this.clone();
        response.message = this.message.withProtocolVersion(protocolVersion);

        return response;
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
        const response = this.clone();
        response.message = this.message.withHeader(name, value);

        return response;
    }

    public withAddedHeader(name: string, value: Array<string> | string): this {
        const response = this.clone();
        response.message = this.message.withAddedHeader(name, value);

        return response;
    }

    public withoutHeader(name: string): this {
        const response = this.clone();
        response.message = this.message.withoutHeader(name);

        return response;
    }

    public getBody(): Duplex {
        return this.message.getBody();
    }

    public withBody(body: Duplex): this {
        const response = this.clone();
        response.message = this.message.withBody(body);

        return response;
    }

    public getMessage(): MessageInterface {
        return this.message;
    }

    private clone(): this {
        return Object.assign(new Response(), this);
    }
}

export default Response;
