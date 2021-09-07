import { describe, expect, test } from '@jest/globals';
import Uri from '../src/Uri';

describe('Uri', () => {
    test('fromString', () => {
        const uris = [
            'https://example.com/',
            'https://user:password@example.com/',
            'https://user:password@example.com:8443/',
            'https://user:password@example.com:8443/path',
            'https://user:password@example.com:8443/path?key=value',
            'https://user:password@example.com:8443/path?key=value#title',
        ];

        uris.forEach((uri) => {
            expect(Uri.fromString(uri).toString()).toBe(uri);
        });
    });

    describe('schema', () => {
        test('get', () => {
            const uri = new Uri();

            expect(uri.getSchema()).toBe('http');
        });

        test('with', () => {
            const uri = new Uri();

            expect(uri.withScheme('http')).not.toBe(uri);
            expect(uri.withScheme('https').getSchema()).toBe('https');
        });
    });

    describe('userInfo', () => {
        test('get', () => {
            const uri = new Uri();

            expect(uri.getUserInfo()).toBe('');
        });

        test('with', () => {
            const uri = new Uri();

            expect(uri.withUserInfo('user')).not.toBe(uri);
            expect(uri.withUserInfo('user').getUserInfo()).toBe('user');
            expect(uri.withUserInfo('user', 'password').getUserInfo()).toBe('user:password');
        });
    });

    describe('host', () => {
        test('get', () => {
            const uri = new Uri();

            expect(uri.getHost()).toBe('localhost');
        });

        test('with', () => {
            const uri = new Uri();

            expect(uri.withHost('example.com')).not.toBe(uri);
            expect(uri.withScheme('example.com').getSchema()).toBe('example.com');
        });
    });

    describe('port', () => {
        test('get', () => {
            const uri = new Uri();

            expect(uri.getPort()).toBe(undefined);
        });

        test('with', () => {
            const uri = new Uri();

            expect(uri.withPort(80)).not.toBe(uri);
            expect(uri.withPort(80).getPort()).toBe(undefined);
            expect(uri.withPort(443).getPort()).toBe(443);
            expect(uri.withPort(8080).getPort()).toBe(8080);
            expect(uri.withScheme('https').withPort(443).getPort()).toBe(undefined);
            expect(uri.withScheme('https').withPort(80).getPort()).toBe(80);
            expect(uri.withScheme('https').withPort(8443).getPort()).toBe(8443);
        });
    });

    describe('path', () => {
        test('get', () => {
            const uri = new Uri();

            expect(uri.getPath()).toBe('/');
        });

        test('with', () => {
            const uri = new Uri();

            expect(uri.withPath('/path')).not.toBe(uri);
            expect(uri.withPath('/path').getPath()).toBe('/path');
        });
    });

    describe('query', () => {
        test('get', () => {
            const uri = new Uri();

            expect(uri.getQuery()).toBe('');
        });

        test('with', () => {
            const uri = new Uri();

            expect(uri.withQuery('key=value')).not.toBe(uri);
            expect(uri.withQuery('key=value').getQuery()).toBe('key=value');
        });
    });

    describe('fragment', () => {
        test('get', () => {
            const uri = new Uri();

            expect(uri.getFragment()).toBe('');
        });

        test('with', () => {
            const uri = new Uri();

            expect(uri.withFragment('title')).not.toBe(uri);
            expect(uri.withFragment('title').getFragment()).toBe('title');
        });
    });

    describe('authority', () => {
        test('get', () => {
            const uri = new Uri();

            expect(uri.getAuthority()).toBe('localhost');
        });

        test('with', () => {
            const uri = new Uri()
                .withScheme('https')
                .withUserInfo('user', 'password')
                .withHost('example.com')
                .withPort(8443);

            expect(uri.getAuthority()).toBe('user:password@example.com:8443');
        });
    });

    describe('toString', () => {
        test('default', () => {
            expect('' + new Uri()).toBe('http://localhost/');
        });

        test('overrides', () => {
            const uri = new Uri()
                .withScheme('https')
                .withUserInfo('user', 'password')
                .withHost('example.com')
                .withPort(8443)
                .withPath('/path')
                .withQuery('key=value')
                .withFragment('title');

            expect('' + uri).toBe('https://user:password@example.com:8443/path?key=value#title');
        });
    });
});
