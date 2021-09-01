import { describe, expect, test } from '@jest/globals';
import { randomBytes } from 'crypto';
import { unlinkSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { PassThrough, Stream } from 'stream';
import StreamFactory from '../../src/Factory/StreamFactory';

const readStream = async (stream: Stream) => {
    return new Promise((resolve, reject) => {
        let data = '';

        stream.on('data', (chunk) => (data += chunk));
        stream.on('end', () => resolve(data));
        stream.on('error', (error) => reject(error));
    });
};

describe('StreamFactory', () => {
    test('createStream', async () => {
        const streamFactory = new StreamFactory();

        const stream = streamFactory.createStream('test');
        stream.end();

        const data = await readStream(stream);

        expect(data).toBe('test');
    });

    describe('createStreamFromFile', () => {
        test('with file', async () => {
            const filename = tmpdir() + '/' + randomBytes(8).toString('hex');

            writeFileSync(filename, 'test');

            const streamFactory = new StreamFactory();

            const stream = streamFactory.createStreamFromFile(filename);

            const data = await readStream(stream);

            expect(data).toBe('test');

            unlinkSync(filename);
        });

        test('without file', async () => {
            const streamFactory = new StreamFactory();

            expect(() => {
                streamFactory.createStreamFromFile('/some/unknown/file');
            }).toThrow('File with filename: "/some/unknown/file" does not exists.');
        });
    });

    test('createStreamFromResource', async () => {
        const existingStream = new PassThrough();
        existingStream.write('test');
        existingStream.end();

        const streamFactory = new StreamFactory();

        const stream = streamFactory.createStreamFromResource(existingStream);

        const data = await readStream(stream);

        expect(data).toBe('test');
    });
});
