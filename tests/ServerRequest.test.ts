import Call from '@chubbyjs/chubbyjs-mock/dist/Call';
import MockByCalls from '@chubbyjs/chubbyjs-mock/dist/MockByCalls';
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

            expect(queryParams).toEqual(new Map());

            queryParams.set('key', 'value');

            expect(serverRequest.getQueryParams().has('key')).toBe(false);
        });

        test('with', () => {
            const serverRequest = new ServerRequest();

            expect(serverRequest.withQueryParams(new Map([['key', 'value']]))).not.toBe(serverRequest);
            expect(serverRequest.withQueryParams(new Map([['key', 'value']])).getQueryParams()).toEqual(
                new Map([['key', 'value']]),
            );
        });
    });

    describe('parsedBody', () => {
        test('get', () => {
            const serverRequest = new ServerRequest();

            expect(serverRequest.getParsedBody()).toEqual(undefined);
        });

        test('with', () => {
            const serverRequest = new ServerRequest();

            expect(serverRequest.withParsedBody(new Map([['key', 'value']]))).not.toBe(serverRequest);
            expect(serverRequest.withParsedBody(new Map([['key', 'value']])).getParsedBody()).toEqual(
                new Map([['key', 'value']]),
            );
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
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
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
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
        });
    });

    describe('method', () => {
        test('get', () => {
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('getMethod').with().willReturn('POST'),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.getMethod()).toBe('POST');
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
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
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
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
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
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
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
        });
    });

    describe('protocolVersion', () => {
        test('get', () => {
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('getProtocolVersion').with().willReturn('1.0'),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.getProtocolVersion()).toBe('1.0');
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
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
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
        });
    });

    describe('headers', () => {
        test('get', () => {
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('getHeaders').with().willReturn(new Map()),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.getHeaders()).toEqual(new Map());
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
        });

        test('hasHeader', () => {
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('hasHeader').with('Content-Type').willReturn(true),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.hasHeader('Content-Type')).toEqual(true);
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
        });

        test('getHeader', () => {
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('getHeader').with('Content-Type').willReturn(['application/json']),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.getHeader('Content-Type')).toEqual(['application/json']);
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
        });

        test('getHeaderLine', () => {
            const request = mockByCalls.create<RequestInterface>(RequestDouble, [
                Call.create('getHeaderLine').with('Content-Type').willReturn('application/json'),
            ]);

            const serverRequest = new ServerRequest(undefined, undefined, undefined, undefined, request);

            expect(serverRequest.getHeaderLine('Content-Type')).toEqual('application/json');
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
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
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
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
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
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
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
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
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
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
            expect(request.__mockByCalls.calls.length).toBe(request.__mockByCalls.index);
        });
    });
});
