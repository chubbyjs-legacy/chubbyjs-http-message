import StreamFactoryInterface from '@chubbyjs/psr-http-factory/dist/StreamFactoryInterface';
import { accessSync, constants, createReadStream } from 'fs';
import { Duplex, PassThrough, Stream } from 'stream';

class StreamFactory implements StreamFactoryInterface {
    public createStream(content: string): Duplex {
        const stream = new PassThrough();

        stream.write(content);

        return stream;
    }

    public createStreamFromFile(filename: string): Duplex {
        try {
            accessSync(filename, constants.R_OK);

            return this.createStreamFromResource(createReadStream(filename));
        } catch (err) {
            throw new Error(`File with filename: "${filename}" does not exists or is not readable`);
        }
    }

    public createStreamFromResource(stream: Stream): Duplex {
        const newStream = new PassThrough();

        stream.pipe(newStream);

        return newStream;
    }
}

export default StreamFactory;
