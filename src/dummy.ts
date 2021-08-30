import { createServer } from 'http';
import ServerRequestFromNode from './ServerRequestFromNode';

createServer(function (req, res) {
    const serverRequestFromNode = new ServerRequestFromNode();

    const serverRequest = serverRequestFromNode.create(req);

    console.log(serverRequest);
    console.log(serverRequest.getHeaders());

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World!');
    res.end();
}).listen(8080);
