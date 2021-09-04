import Call from '@chubbyjs/chubbyjs-mock/dist/Call';
import MockByCalls, { mockByCallsUsed } from '@chubbyjs/chubbyjs-mock/dist/MockByCalls';
import MessageInterface from '@chubbyjs/psr-http-message/dist/MessageInterface';
import { describe, expect, test } from '@jest/globals';
import { Duplex } from 'stream';
import Response from '../src/Response';
import MessageDouble from './Double/MessageDouble';

const mockByCalls = new MockByCalls();

describe('Response', () => {
    describe('status', () => {
        test('get default', () => {
            const response = new Response();

            expect(response.getStatusCode()).toBe(200);
            expect(response.getReasonPhrase()).toBe('OK');
        });

        test('get with different known code', () => {
            const response = new Response(404);

            expect(response.getStatusCode()).toBe(404);
            expect(response.getReasonPhrase()).toBe('Not Found');
        });

        test('get with different unknown code', () => {
            const response = new Response(800);

            expect(response.getStatusCode()).toBe(800);
            expect(response.getReasonPhrase()).toBe('');
        });

        test('with', () => {
            const response = new Response();

            expect(response.withStatus(404)).not.toBe(response);
            expect(response.withStatus(404).getStatusCode()).toBe(404);
            expect(response.withStatus(404).getReasonPhrase()).toBe('Not Found');
            expect(response.withStatus(404, 'Custom').getReasonPhrase()).toBe('Custom');

            expect(response.withStatus(800).getReasonPhrase()).toBe('');
        });

        test('statusCodeMap', () => {
            expect(new Response().withStatus(100).getReasonPhrase()).toBe('Continue');
            expect(new Response().withStatus(101).getReasonPhrase()).toBe('Switching Protocols');
            expect(new Response().withStatus(102).getReasonPhrase()).toBe('Processing');
            expect(new Response().withStatus(103).getReasonPhrase()).toBe('Early Hints');
            expect(new Response().withStatus(110).getReasonPhrase()).toBe('Response is Stale');
            expect(new Response().withStatus(111).getReasonPhrase()).toBe('Revalidation Failed');
            expect(new Response().withStatus(112).getReasonPhrase()).toBe('Disconnected Operation');
            expect(new Response().withStatus(113).getReasonPhrase()).toBe('Heuristic Expiration');
            expect(new Response().withStatus(199).getReasonPhrase()).toBe('Miscellaneous Warning');
            expect(new Response().withStatus(200).getReasonPhrase()).toBe('OK');
            expect(new Response().withStatus(201).getReasonPhrase()).toBe('Created');
            expect(new Response().withStatus(202).getReasonPhrase()).toBe('Accepted');
            expect(new Response().withStatus(203).getReasonPhrase()).toBe('Non-Authoritative Information');
            expect(new Response().withStatus(204).getReasonPhrase()).toBe('No Content');
            expect(new Response().withStatus(205).getReasonPhrase()).toBe('Reset Content');
            expect(new Response().withStatus(206).getReasonPhrase()).toBe('Partial Content');
            expect(new Response().withStatus(207).getReasonPhrase()).toBe('Multi-Status');
            expect(new Response().withStatus(208).getReasonPhrase()).toBe('Already Reported');
            expect(new Response().withStatus(214).getReasonPhrase()).toBe('Transformation Applied');
            expect(new Response().withStatus(226).getReasonPhrase()).toBe('IM Used');
            expect(new Response().withStatus(299).getReasonPhrase()).toBe('Miscellaneous Persistent Warning');
            expect(new Response().withStatus(300).getReasonPhrase()).toBe('Multiple Choices');
            expect(new Response().withStatus(301).getReasonPhrase()).toBe('Moved Permanently');
            expect(new Response().withStatus(302).getReasonPhrase()).toBe('Found');
            expect(new Response().withStatus(303).getReasonPhrase()).toBe('See Other');
            expect(new Response().withStatus(304).getReasonPhrase()).toBe('Not Modified');
            expect(new Response().withStatus(305).getReasonPhrase()).toBe('Use Proxy');
            expect(new Response().withStatus(306).getReasonPhrase()).toBe('Switch Proxy');
            expect(new Response().withStatus(307).getReasonPhrase()).toBe('Temporary Redirect');
            expect(new Response().withStatus(308).getReasonPhrase()).toBe('Permanent Redirect');
            expect(new Response().withStatus(400).getReasonPhrase()).toBe('Bad Request');
            expect(new Response().withStatus(401).getReasonPhrase()).toBe('Unauthorized');
            expect(new Response().withStatus(402).getReasonPhrase()).toBe('Payment Required');
            expect(new Response().withStatus(403).getReasonPhrase()).toBe('Forbidden');
            expect(new Response().withStatus(404).getReasonPhrase()).toBe('Not Found');
            expect(new Response().withStatus(405).getReasonPhrase()).toBe('Method Not Allowed');
            expect(new Response().withStatus(406).getReasonPhrase()).toBe('Not Acceptable');
            expect(new Response().withStatus(407).getReasonPhrase()).toBe('Proxy Authentication Required');
            expect(new Response().withStatus(408).getReasonPhrase()).toBe('Request Timeout');
            expect(new Response().withStatus(409).getReasonPhrase()).toBe('Conflict');
            expect(new Response().withStatus(410).getReasonPhrase()).toBe('Gone');
            expect(new Response().withStatus(411).getReasonPhrase()).toBe('Length Required');
            expect(new Response().withStatus(412).getReasonPhrase()).toBe('Precondition Failed');
            expect(new Response().withStatus(413).getReasonPhrase()).toBe('Payload Too Large');
            expect(new Response().withStatus(414).getReasonPhrase()).toBe('URI Too Long');
            expect(new Response().withStatus(415).getReasonPhrase()).toBe('Unsupported Media Type');
            expect(new Response().withStatus(416).getReasonPhrase()).toBe('Range Not Satisfiable');
            expect(new Response().withStatus(417).getReasonPhrase()).toBe('Expectation Failed');
            expect(new Response().withStatus(418).getReasonPhrase()).toBe("I'm a teapot");
            expect(new Response().withStatus(421).getReasonPhrase()).toBe('Misdirected Request');
            expect(new Response().withStatus(422).getReasonPhrase()).toBe('Unprocessable Entity');
            expect(new Response().withStatus(423).getReasonPhrase()).toBe('Locked');
            expect(new Response().withStatus(424).getReasonPhrase()).toBe('Failed Dependency');
            expect(new Response().withStatus(425).getReasonPhrase()).toBe('Too Early');
            expect(new Response().withStatus(426).getReasonPhrase()).toBe('Upgrade Required');
            expect(new Response().withStatus(428).getReasonPhrase()).toBe('Precondition Required');
            expect(new Response().withStatus(429).getReasonPhrase()).toBe('Too Many Requests');
            expect(new Response().withStatus(431).getReasonPhrase()).toBe('Request Header Fields Too Large');
            expect(new Response().withStatus(451).getReasonPhrase()).toBe('Unavailable For Legal Reasons');
            expect(new Response().withStatus(500).getReasonPhrase()).toBe('Internal Server Error');
            expect(new Response().withStatus(501).getReasonPhrase()).toBe('Not Implemented');
            expect(new Response().withStatus(502).getReasonPhrase()).toBe('Bad Gateway');
            expect(new Response().withStatus(503).getReasonPhrase()).toBe('Service Unavailable');
            expect(new Response().withStatus(504).getReasonPhrase()).toBe('Gateway Timeout');
            expect(new Response().withStatus(505).getReasonPhrase()).toBe('HTTP Version Not Supported');
            expect(new Response().withStatus(506).getReasonPhrase()).toBe('Variant Also Negotiates');
            expect(new Response().withStatus(507).getReasonPhrase()).toBe('Insufficient Storage');
            expect(new Response().withStatus(508).getReasonPhrase()).toBe('Loop Detected');
            expect(new Response().withStatus(510).getReasonPhrase()).toBe('Not Extended');
            expect(new Response().withStatus(511).getReasonPhrase()).toBe('Network Authentication Required');
        });
    });

    describe('protocolVersion', () => {
        test('get', () => {
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('getProtocolVersion').with().willReturn('1.0'),
            ]);

            const response = new Response(undefined, undefined, message);

            expect(response.getProtocolVersion()).toBe('1.0');
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('with', () => {
            const messageClone = new MessageDouble();
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('withProtocolVersion').with('1.0').willReturn(messageClone),
            ]);

            const response = new Response(undefined, undefined, message);

            const newResponse = response.withProtocolVersion('1.0');

            expect(newResponse).toBeInstanceOf(Response);
            expect(newResponse.getMessage()).toEqual(messageClone);
            expect(mockByCallsUsed(message)).toBe(true);
        });
    });

    describe('headers', () => {
        test('get', () => {
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('getHeaders').with().willReturn(new Map()),
            ]);

            const response = new Response(undefined, undefined, message);

            expect(response.getHeaders()).toEqual(new Map());
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('hasHeader', () => {
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('hasHeader').with('Content-Type').willReturn(true),
            ]);

            const response = new Response(undefined, undefined, message);

            expect(response.hasHeader('Content-Type')).toEqual(true);
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('getHeader', () => {
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('getHeader').with('Content-Type').willReturn(['application/json']),
            ]);

            const response = new Response(undefined, undefined, message);

            expect(response.getHeader('Content-Type')).toEqual(['application/json']);
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('getHeaderLine', () => {
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('getHeaderLine').with('Content-Type').willReturn('application/json'),
            ]);

            const response = new Response(undefined, undefined, message);

            expect(response.getHeaderLine('Content-Type')).toEqual('application/json');
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('withHeader', () => {
            const messageClone = new MessageDouble();
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('withHeader').with('Content-Type', 'application/json').willReturn(messageClone),
            ]);

            const response = new Response(undefined, undefined, message);

            const newResponse = response.withHeader('Content-Type', 'application/json');

            expect(newResponse).toBeInstanceOf(Response);
            expect(newResponse.getMessage()).toEqual(messageClone);
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('withAddedHeader (withHeader)', () => {
            const messageClone = new MessageDouble();
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('withAddedHeader').with('Content-Type', 'application/json').willReturn(messageClone),
            ]);

            const response = new Response(undefined, undefined, message);

            const newResponse = response.withAddedHeader('Content-Type', 'application/json');

            expect(newResponse).toBeInstanceOf(Response);
            expect(newResponse.getMessage()).toEqual(messageClone);
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('withoutHeader', () => {
            const messageClone = new MessageDouble();
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('withoutHeader').with('Content-Type').willReturn(messageClone),
            ]);

            const response = new Response(undefined, undefined, message);

            const newResponse = response.withoutHeader('Content-Type');

            expect(newResponse).toBeInstanceOf(Response);
            expect(newResponse.getMessage()).toEqual(messageClone);
            expect(mockByCallsUsed(message)).toBe(true);
        });
    });

    describe('body', () => {
        test('get', () => {
            const body = new Duplex();

            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('getBody').with().willReturn('1.0').willReturn(body),
            ]);

            const response = new Response(undefined, undefined, message);

            expect(response.getBody()).toBe(body);
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('with', () => {
            const body = new Duplex();

            const messageClone = new MessageDouble();
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('withBody').with(body).willReturn(messageClone),
            ]);

            const response = new Response(undefined, undefined, message);

            const newResponse = response.withBody(body);

            expect(newResponse).toBeInstanceOf(Response);
            expect(newResponse.getMessage()).toEqual(messageClone);
            expect(mockByCallsUsed(message)).toBe(true);
        });
    });
});
