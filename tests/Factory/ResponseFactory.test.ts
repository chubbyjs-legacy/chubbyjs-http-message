import { describe, expect, test } from '@jest/globals';
import ResponseFactory from '../../src/Factory/ResponseFactory';
import Response from '../../src/Response';

describe('ResponseFactory', () => {
    describe('createResponse', () => {
        test('without reason phrase', () => {
            const responseFactory = new ResponseFactory();

            const response = responseFactory.createResponse(404);

            expect(response).toBeInstanceOf(Response);
            expect(response.getStatusCode()).toBe(404);
            expect(response.getReasonPhrase()).toBe('Not Found');
        });

        test('with reason phrase', () => {
            const responseFactory = new ResponseFactory();

            const response = responseFactory.createResponse(404, 'Yet another not found message');

            expect(response).toBeInstanceOf(Response);
            expect(response.getStatusCode()).toBe(404);
            expect(response.getReasonPhrase()).toBe('Yet another not found message');
        });
    });
});
