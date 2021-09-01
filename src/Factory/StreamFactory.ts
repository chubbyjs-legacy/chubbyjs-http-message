import StreamFactoryInterface from '@chubbyjs/psr-http-factory/dist/StreamFactoryInterface';
import { createReadStream, existsSync } from 'fs';
import { Duplex, PassThrough, Stream } from 'stream';

class StreamFactory implements StreamFactoryInterface {
    public createStream(content: string): Duplex {
        const stream = new PassThrough();
        stream.write(content);

        return stream;
    }

    public createStreamFromFile(filename: string): Duplex {
        if (!existsSync(filename)) {
            throw new Error(`File with filename: "${filename}" does not exists.`);
        }

        return this.createStreamFromResource(createReadStream(filename));
    }

    public createStreamFromResource(stream: Stream): Duplex {
        const newStream = new PassThrough();
        stream.pipe(newStream);

        return newStream;
    }
}

export default StreamFactory;
