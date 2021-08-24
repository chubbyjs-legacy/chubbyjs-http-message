import ResponseFactoryInterface from '@chubbyjs/psr-http-factory/dist/ResponseFactoryInterface';
import ResponseInterface from '@chubbyjs/psr-http-message/dist/ResponseInterface';
import Response from '../Response';

class ResponseFactory implements ResponseFactoryInterface {
    public createResponse(code: number, reasonPhrase?: string): ResponseInterface {
        return new Response(code, reasonPhrase);
    }
}

export default ResponseFactory;
