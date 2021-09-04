import RequestFactoryInterface from '@chubbyjs/psr-http-factory/dist/RequestFactoryInterface';
import RequestInterface, { Method } from '@chubbyjs/psr-http-message/dist/RequestInterface';
import UriInterface from '@chubbyjs/psr-http-message/dist/UriInterface';
import Request from '../Request';
import Uri from '../Uri';

class RequestFactory implements RequestFactoryInterface {
    public createRequest(method: Method, uri: string | UriInterface): RequestInterface {
        return new Request(undefined, method, Uri.fromString(uri as string));
    }
}

export default RequestFactory;
