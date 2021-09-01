import Call from '@chubbyjs/chubbyjs-mock/dist/Call';
import MockByCalls, { mockByCallsUsed } from '@chubbyjs/chubbyjs-mock/dist/MockByCalls';
import RequestInterface from '@chubbyjs/psr-http-message/dist/RequestInterface';
import { describe, expect, test } from '@jest/globals';
import { Duplex } from 'stream';
import ServerRequest from '../src/ServerRequest';
import Uri from '../src/Uri';
import RequestDouble from './Dummy/RequestDouble';

const mockByCalls = new MockByCalls();

describe('ServerRequest', () => {
    describe('cookieParams', () => {
        test('get', () => {
            const serverRequest = new ServerRequest();

            const cookieParams = serverRequest.getCookieParams();

            expect(cookieParams).toEqual(new Map());

            cookieParams.set('key', 'value');

            expect(serverRequest.getCookieParams().has('key')).toBe(false);
        });

        test('with', () => {
            const serverRequest = new ServerRequest();

            expect(serverRequest.withCookieParams(new Map([['key', 'value']]))).not.toBe(serverRequest);
            expect(serverRequest.withCookieParams(new Map([['key', 'value']])).getCookieParams()).toEqual(
                new Map([['key', 'value']]),
            );
        });
    });

    describe('queryParams', () => {
        test('get', () => {
            const serverRequest = new ServerRequest();

            const queryParams = serverRequest.getQueryParams();

            expect(queryParams).toEqual({});

            queryParams.key = 'value';

            expect(serverRequest.getQueryParams()).toEqual({});
        });

        test('with', () => {
            const serverRequest = new ServerRequest();

            expect(serverRequest.withQueryParams({ key: 'value' })).not.toBe(serverRequest);
            expect(serverRequest.withQueryParams({ key: 'value' }).getQueryParams()).toEqual({ key: 'value' });
        });
    });

    describe('parsedBody', () => {
        test('get', () => {
            const serverRequest = new ServerRequest();

            expect(serverRequest.getParsedBody()).toEqual(undefined);
        });

        test('with', () => {
            const serverRequest = new ServerRequest();

            expect(serverRequest.withParsedBody({ key: 'value' })).not.toBe(serverRequest);
            expect(serverRequest.withParsedBody({ key: 'value' }).getParsedBody()).toEqual({ key: 'value' });
        });
    });

    describe('attributes', () => {
        test('getAttributes', () => {
            const serverRequest = new ServerRequest();

            const attributes = serverRequest.getAttributes();

            expect(attributes).toEqual(new Map());

            attributes.set('key', 'value');

            expect(serverRequest.getAttributes().has('key')).toBe(false);
        });

        test('getAttribute', () => {
            const serverRequest = new ServerRequest();

            expect(serverRequest.getAttribute('key')).toBe(undefined);
            expect(serverRequest.getAttribute('key', 'defaultValue')).toBe('defaultValue');
            expect(serverRequest.withAttribute('key', 'value').getAttribute('key', 'defaultValue')).toBe('value');
        });

        test('withAttribute', () => {
            const serverRequest = new ServerRequest();

            const serverRequestWithAttributes = serverRequest.withAttribute('key', 'value');

            expect(serverRequestWithAttributes).not.toBe(serverRequest);
            expect(serverRequestWithAttributes.getAttributes()).toEqual(new Map([['key', 'value']]));

            expect(serverRequest.getAttributes()).toEqual(new Map());
        });

        test('withoutAttribute', () => {
            const serverRequestWithAttributes = new ServerRequest().withAttribute('key', 'value');

            const serverRequestWithoutAttributes = serverRequestWithAttributes.withoutAttribute('key');

            expect(serverRequestWithAttributes.getAttributes()).toEqual(new Map([['key', 'value']]));
            expect(serverRequestWithoutAttributes.getAttributes()).toEqual(new Map());
        });
    });

    describe('requestTarget', () => {
        test('get', () => {
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('getRequestTarget').with().willReturn('/'),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.getRequestTarget()).toBe('/');
            expect(mockByCallsUsed(request)).toBe(true);
        });

        test('with', () => {
            const requestClone = new RequestDouble();
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('withRequestTarget').with('/').willReturn(requestClone),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            const newServerRequest = serverRequest.withRequestTarget('/');

            expect(newServerRequest).toBeInstanceOf(ServerRequest);
            expect(newServerRequest.getRequest()).toEqual(requestClone);
            expect(mockByCallsUsed(request)).toBe(true);
        });
    });

    describe('method', () => {
        test('get', () => {
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('getMethod').with().willReturn('POST'),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.getMethod()).toBe('POST');
            expect(mockByCallsUsed(request)).toBe(true);
        });

        test('with', () => {
            const requestClone = new RequestDouble();
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('withMethod').with('POST').willReturn(requestClone),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            const newServerRequest = serverRequest.withMethod('POST');

            expect(newServerRequest).toBeInstanceOf(ServerRequest);
            expect(newServerRequest.getRequest()).toEqual(requestClone);
            expect(mockByCallsUsed(request)).toBe(true);
        });
    });

    describe('uri', () => {
        test('get', () => {
            const uri = new Uri();

            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('getUri').with().willReturn(uri),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.getUri()).toBe(uri);
            expect(mockByCallsUsed(request)).toBe(true);
        });

        test('with', () => {
            const uri = new Uri();

            const requestClone = new RequestDouble();
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('withUri').with(uri, false).willReturn(requestClone),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            const newServerRequest = serverRequest.withUri(uri);

            expect(newServerRequest).toBeInstanceOf(ServerRequest);
            expect(newServerRequest.getRequest()).toEqual(requestClone);
            expect(mockByCallsUsed(request)).toBe(true);
        });
    });

    describe('protocolVersion', () => {
        test('get', () => {
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('getProtocolVersion').with().willReturn('1.0'),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.getProtocolVersion()).toBe('1.0');
            expect(mockByCallsUsed(request)).toBe(true);
        });

        test('with', () => {
            const requestClone = new RequestDouble();
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('withProtocolVersion').with('1.0').willReturn(requestClone),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            const newServerRequest = serverRequest.withProtocolVersion('1.0');

            expect(newServerRequest).toBeInstanceOf(ServerRequest);
            expect(newServerRequest.getRequest()).toEqual(requestClone);
            expect(mockByCallsUsed(request)).toBe(true);
        });
    });

    describe('headers', () => {
        test('get', () => {
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('getHeaders').with().willReturn(new Map()),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.getHeaders()).toEqual(new Map());
            expect(mockByCallsUsed(request)).toBe(true);
        });

        test('hasHeader', () => {
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('hasHeader').with('Content-Type').willReturn(true),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.hasHeader('Content-Type')).toEqual(true);
            expect(mockByCallsUsed(request)).toBe(true);
        });

        test('getHeader', () => {
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('getHeader').with('Content-Type').willReturn(['application/json']),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.getHeader('Content-Type')).toEqual(['application/json']);
            expect(mockByCallsUsed(request)).toBe(true);
        });

        test('getHeaderLine', () => {
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('getHeaderLine').with('Content-Type').willReturn('application/json'),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.getHeaderLine('Content-Type')).toEqual('application/json');
            expect(mockByCallsUsed(request)).toBe(true);
        });

        test('withHeader', () => {
            const requestClone = new RequestDouble();
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('withHeader').with('Content-Type', 'application/json').willReturn(requestClone),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            const newServerRequest = serverRequest.withHeader('Content-Type', 'application/json');

            expect(newServerRequest).toBeInstanceOf(ServerRequest);
            expect(newServerRequest.getRequest()).toEqual(requestClone);
            expect(mockByCallsUsed(request)).toBe(true);
        });

        test('withAddedHeader (withHeader)', () => {
            const requestClone = new RequestDouble();
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('withAddedHeader').with('Content-Type', 'application/json').willReturn(requestClone),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            const newServerRequest = serverRequest.withAddedHeader('Content-Type', 'application/json');

            expect(newServerRequest).toBeInstanceOf(ServerRequest);
            expect(newServerRequest.getRequest()).toEqual(requestClone);
            expect(mockByCallsUsed(request)).toBe(true);
        });

        test('withoutHeader', () => {
            const requestClone = new RequestDouble();
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('withoutHeader').with('Content-Type').willReturn(requestClone),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            const newServerRequest = serverRequest.withoutHeader('Content-Type');

            expect(newServerRequest).toBeInstanceOf(ServerRequest);
            expect(newServerRequest.getRequest()).toEqual(requestClone);
            expect(mockByCallsUsed(request)).toBe(true);
        });
    });

    describe('body', () => {
        test('get', () => {
            const body = new Duplex();

            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('getBody').with().willReturn('1.0').willReturn(body),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.getBody()).toBe(body);
            expect(mockByCallsUsed(request)).toBe(true);
        });

        test('with', () => {
            const body = new Duplex();

            const requestClone = new RequestDouble();
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('withBody').with(body).willReturn(requestClone),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            const newServerRequest = serverRequest.withBody(body);

            expect(newServerRequest).toBeInstanceOf(ServerRequest);
            expect(newServerRequest.getRequest()).toEqual(requestClone);
            expect(mockByCallsUsed(request)).toBe(true);
        });
    });
});
