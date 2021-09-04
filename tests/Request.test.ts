import Call from '@chubbyjs/chubbyjs-mock/dist/Call';
import MockByCalls, { mockByCallsUsed } from '@chubbyjs/chubbyjs-mock/dist/MockByCalls';
import MessageInterface from '@chubbyjs/psr-http-message/dist/MessageInterface';
import { Method } from '@chubbyjs/psr-http-message/dist/RequestInterface';
import { describe, expect, test } from '@jest/globals';
import { Duplex } from 'stream';
import Request from '../src/Request';
import Uri from '../src/Uri';
import MessageDouble from './Double/MessageDouble';

const mockByCalls = new MockByCalls();

describe('Request', () => {
    describe('requestTarget', () => {
        test('get', () => {
            const request = new Request();

            expect(request.getRequestTarget()).toBe('');
        });

        test('with', () => {
            const request = new Request();

            expect(request.withRequestTarget('/')).not.toBe(request);
            expect(request.withRequestTarget('/').getRequestTarget()).toBe('/');
        });
    });

    describe('method', () => {
        test('get', () => {
            const request = new Request();

            expect(request.getMethod()).toBe(Method.GET);
        });

        test('with', () => {
            const request = new Request();

            expect(request.withMethod(Method.POST)).not.toBe(request);
            expect(request.withMethod(Method.POST).getMethod()).toBe(Method.POST);
        });
    });

    describe('uri', () => {
        test('get', () => {
            const request = new Request();

            expect(request.getUri()).toEqual(new Uri());
        });

        test('with', () => {
            const uri = new Uri().withPath('/');

            const request = new Request();

            expect(request.withUri(uri)).not.toBe(request);
            expect(request.withUri(uri).getUri()).toBe(uri);
            expect(request.withUri(uri).getRequestTarget()).toBe('/');
            expect(request.withUri(uri.withQuery('key=value')).getRequestTarget()).toBe('/?key=value');
            expect(request.withUri(uri.withQuery('key=value').withFragment('title')).getRequestTarget()).toBe(
                '/?key=value#title',
            );

            expect(request.withRequestTarget('/path').withUri(uri).getRequestTarget()).toBe('/path');

            expect(request.withHeader('Host', 'some-host').withUri(uri).getHeaderLine('Host')).toBe('localhost');
            expect(request.withHeader('Host', 'some-host').withUri(uri, true).getHeaderLine('Host')).toBe('some-host');
            expect(request.withHeader('Host', '').withUri(uri).getHeaderLine('Host')).toBe('localhost');
            expect(request.withHeader('Host', '').withUri(uri, true).getHeaderLine('Host')).toBe('localhost');
            expect(request.withUri(uri).getHeaderLine('Host')).toBe('localhost');
            expect(request.withUri(uri, true).getHeaderLine('Host')).toBe('localhost');
            expect(request.withUri(new Uri().withHost('')).hasHeader('Host')).toBe(false);
            expect(request.withUri(new Uri().withHost(''), true).hasHeader('Host')).toBe(false);
        });
    });

    describe('protocolVersion', () => {
        test('get', () => {
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('getProtocolVersion').with().willReturn('1.0'),
            ]);

            const request = new Request(undefined, undefined, undefined, message);

            expect(request.getProtocolVersion()).toBe('1.0');
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('with', () => {
            const messageClone = new MessageDouble();
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('withProtocolVersion').with('1.0').willReturn(messageClone),
            ]);

            const request = new Request(undefined, undefined, undefined, message);

            const newRequest = request.withProtocolVersion('1.0');

            expect(newRequest).toBeInstanceOf(Request);
            expect(newRequest.getMessage()).toEqual(messageClone);
            expect(mockByCallsUsed(message)).toBe(true);
        });
    });

    describe('headers', () => {
        test('get', () => {
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('getHeaders').with().willReturn(new Map()),
            ]);

            const request = new Request(undefined, undefined, undefined, message);

            expect(request.getHeaders()).toEqual(new Map());
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('hasHeader', () => {
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('hasHeader').with('Content-Type').willReturn(true),
            ]);

            const request = new Request(undefined, undefined, undefined, message);

            expect(request.hasHeader('Content-Type')).toEqual(true);
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('getHeader', () => {
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('getHeader').with('Content-Type').willReturn(['application/json']),
            ]);

            const request = new Request(undefined, undefined, undefined, message);

            expect(request.getHeader('Content-Type')).toEqual(['application/json']);
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('getHeaderLine', () => {
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('getHeaderLine').with('Content-Type').willReturn('application/json'),
            ]);

            const request = new Request(undefined, undefined, undefined, message);

            expect(request.getHeaderLine('Content-Type')).toEqual('application/json');
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('withHeader', () => {
            const messageClone = new MessageDouble();
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('withHeader').with('Content-Type', 'application/json').willReturn(messageClone),
            ]);

            const request = new Request(undefined, undefined, undefined, message);

            const newRequest = request.withHeader('Content-Type', 'application/json');

            expect(newRequest).toBeInstanceOf(Request);
            expect(newRequest.getMessage()).toEqual(messageClone);
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('withAddedHeader (withHeader)', () => {
            const messageClone = new MessageDouble();
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('withAddedHeader').with('Content-Type', 'application/json').willReturn(messageClone),
            ]);

            const request = new Request(undefined, undefined, undefined, message);

            const newRequest = request.withAddedHeader('Content-Type', 'application/json');

            expect(newRequest).toBeInstanceOf(Request);
            expect(newRequest.getMessage()).toEqual(messageClone);
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('withoutHeader', () => {
            const messageClone = new MessageDouble();
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('withoutHeader').with('Content-Type').willReturn(messageClone),
            ]);

            const request = new Request(undefined, undefined, undefined, message);

            const newRequest = request.withoutHeader('Content-Type');

            expect(newRequest).toBeInstanceOf(Request);
            expect(newRequest.getMessage()).toEqual(messageClone);
            expect(mockByCallsUsed(message)).toBe(true);
        });
    });

    describe('body', () => {
        test('get', () => {
            const body = new Duplex();

            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('getBody').with().willReturn('1.0').willReturn(body),
            ]);

            const request = new Request(undefined, undefined, undefined, message);

            expect(request.getBody()).toBe(body);
            expect(mockByCallsUsed(message)).toBe(true);
        });

        test('with', () => {
            const body = new Duplex();

            const messageClone = new MessageDouble();
            const message = mockByCalls.create<MessageInterface>(MessageDouble, [
                Call.create('withBody').with(body).willReturn(messageClone),
            ]);

            const request = new Request(undefined, undefined, undefined, message);

            const newRequest = request.withBody(body);

            expect(newRequest).toBeInstanceOf(Request);
            expect(newRequest.getMessage()).toEqual(messageClone);
            expect(mockByCallsUsed(message)).toBe(true);
        });
    });
});
