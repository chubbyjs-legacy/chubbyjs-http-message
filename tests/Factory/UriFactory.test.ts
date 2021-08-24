import { describe, expect, test } from '@jest/globals';
import UriFactory from '../../src/Factory/UriFactory';
import Uri from '../../src/Uri';

describe('UriFactory', () => {
    test('createUri', () => {
        const uriFactory = new UriFactory();

        const uri = uriFactory.createUri('http://www.example.com/test');

        expect(uri).toBeInstanceOf(Uri);
        expect(uri.toString()).toBe('http://www.example.com/test');
    });
});
