import ServerRequestFactoryInterface from '@chubbyjs/psr-http-factory/dist/ServerRequestFactoryInterface';
import ServerRequestInterface from '@chubbyjs/psr-http-message/dist/ServerRequestInterface';
import UriInterface from '@chubbyjs/psr-http-message/dist/UriInterface';
import Request from '../Request';
import ServerRequest from '../ServerRequest';
import Uri from '../Uri';

class ServerRequestFactory implements ServerRequestFactoryInterface {
    public createServerRequest(method: string, uri: string | UriInterface): ServerRequestInterface {
        return new ServerRequest(
            undefined,
            undefined,
            undefined,
            undefined,
            new Request(undefined, method, Uri.fromString(uri as string)),
        );
    }
}

export default ServerRequestFactory;
