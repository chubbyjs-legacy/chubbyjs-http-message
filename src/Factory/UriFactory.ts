import UriFactoryInterface from '@chubbyjs/psr-http-factory/dist/UriFactoryInterface';
import UriInterface from '@chubbyjs/psr-http-message/dist/UriInterface';
import Uri from '../Uri';

class UriFactory implements UriFactoryInterface {
    public createUri(uri: string): UriInterface {
        return Uri.fromString(uri);
    }
}

export default UriFactory;
