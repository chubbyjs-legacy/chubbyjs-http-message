import { describe, expect, test } from '@jest/globals';
import { Duplex } from 'stream';
import Message from '../src/Message';

describe('Message', () => {
    describe('protocolVersion', () => {
        test('get', () => {
            const message = new Message();

            expect(message.getProtocolVersion()).toBe('1.1');
        });

        test('with', () => {
            const message = new Message();

            expect(message.withProtocolVersion('1.0')).not.toBe(message);
            expect(message.withProtocolVersion('1.0').getProtocolVersion()).toBe('1.0');
        });
    });

    describe('headers', () => {
        test('get', () => {
            const message = new Message();

            const headers = message.getHeaders();

            expect(headers).toEqual(new Map());

            headers.set('key', ['value']);

            expect(message.getHeaders().has('key')).toBe(false);
        });

        test('get with construct', () => {
            const message = new Message(undefined, new Map([['key', 'value']]));

            expect(message.getHeaders().has('key')).toBe(true);
            expect(message.getHeaders().get('key')).toEqual(['value']);
        });

        test('hasHeader (withHeader)', () => {
            const message = new Message();

            expect(message.withHeader('Content-Type', 'application/json').hasHeader('Content-Type')).toBe(true);
            expect(message.withHeader('Content-Type', 'application/json').hasHeader('content-Type')).toBe(true);
        });

        test('getHeaders (withHeader)', () => {
            const message = new Message();

            expect(message.withHeader('Content-Type', 'application/json').getHeaders()).toEqual(
                new Map([['Content-Type', ['application/json']]]),
            );
            expect(message.withHeader('Content-Type', ['application/json', 'application/xml']).getHeaders()).toEqual(
                new Map([['Content-Type', ['application/json', 'application/xml']]]),
            );

            expect(message.withHeader('Content-Type', 'application/json, application/xml').getHeaders()).toEqual(
                new Map([['Content-Type', ['application/json', 'application/xml']]]),
            );
        });

        test('getHeader (withHeader)', () => {
            const message = new Message();

            expect(message.withHeader('Content-Type', 'application/json').getHeader('Content-Type')).toEqual([
                'application/json',
            ]);
            expect(message.withHeader('Content-Type', 'application/json').getHeader('content-Type')).toEqual([
                'application/json',
            ]);
        });

        test('getHeaderLine (withHeader)', () => {
            const message = new Message();

            expect(
                message
                    .withHeader('Content-Type', ['application/json', 'application/xml'])
                    .getHeaderLine('Content-Type'),
            ).toBe('application/json, application/xml');

            expect(message.withHeader('Content-Type', 'application/json').getHeaderLine('content-Type')).toBe(
                'application/json',
            );
        });

        test('withHeader', () => {
            const message = new Message();

            expect(message.withHeader('Content-Type', 'application/json')).not.toBe(message);
            expect(message.withHeader('Content-Type', 'application/json').getHeader('Content-Type')).toEqual([
                'application/json',
            ]);
            expect(message.withHeader('Content-Type', ['application/json']).getHeader('content-Type')).toEqual([
                'application/json',
            ]);
        });

        test('withAddedHeader (withHeader)', () => {
            const message = new Message();

            expect(message.withAddedHeader('Content-Type', 'application/json')).not.toBe(message);
            expect(
                message
                    .withHeader('Content-Type', 'application/json')
                    .withAddedHeader('content-Type', 'application/xml')
                    .withAddedHeader('content-TYPe', 'application/x+html, text/html')
                    .getHeader('Content-Type'),
            ).toEqual(['application/json', 'application/xml', 'application/x+html', 'text/html']);
            expect(
                message
                    .withHeader('Content-Type', 'application/json')
                    .withAddedHeader('content-Type', ['application/xml'])
                    .getHeader('content-Type'),
            ).toEqual(['application/json', 'application/xml']);
        });

        test('withoutHeader', () => {
            const message = new Message();

            expect(message.withoutHeader('Content-Type')).not.toBe(message);
            expect(
                message
                    .withHeader('Content-Type', 'application/json')
                    .withoutHeader('Content-Type')
                    .getHeader('Content-Type'),
            ).toEqual([]);
            expect(
                message
                    .withHeader('Content-Type', 'application/json')
                    .withoutHeader('content-Type')
                    .getHeader('Content-Type'),
            ).toEqual([]);
        });
    });

    describe('body', () => {
        test('get', () => {
            const message = new Message();

            expect(message.getBody()).toBeInstanceOf(Duplex);
        });

        test('with', () => {
            const message = new Message();

            const body = new Duplex();

            expect(message.withBody(body)).not.toBe(message);
            expect(message.withBody(body).getBody()).toBe(body);
        });

        test('write / read', () => {
            const writeData = JSON.stringify({ key: 'value' });

            const message = new Message();

            const body = message.getBody();

            body.write(writeData);

            let readData = '';
            let readChunk = '';

            while ((readChunk = body.read())) {
                readData += readChunk;
            }

            expect(readData).toBe(writeData);
        });
    });
});
