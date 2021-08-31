import { createServer } from 'http';
import { Stream } from 'stream';
import ServerRequestFactory from './Factory/ServerRequestFactory';
import UriFactory from './Factory/UriFactory';
import ServerRequestFromNode from './ServerRequestFromNode';

const readStream = async (stream: Stream) => {
    return new Promise((resolve, reject) => {
        let data = '';

        stream.on('data', (chunk) => (data += chunk));
        stream.on('end', () => resolve(data));
        stream.on('error', (error) => reject(error));
    });
};

(async () => {
    createServer(async (req, res) => {
        const serverRequestFromNode = new ServerRequestFromNode(new ServerRequestFactory(), new UriFactory());

        const serverRequest = serverRequestFromNode.create(req);

        console.log(serverRequest);
        console.log(serverRequest.getHeaders());
        console.log(await readStream(serverRequest.getBody()));

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('Hello World!');
        res.end();
    }).listen(8080);
})();

/**
 * curl -XPOST 'http://localhost:8080/path?key=value#title' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'Cookie: name=value; name2=value2; name3=value3' \
-d '{"key": "value"}'
 */
