import UriInterface from '@chubbyjs/psr-http-message/dist/UriInterface';

class Uri implements UriInterface {
    private schema: string = 'http';
    private userInfo: string = '';
    private host: string = 'localhost';
    private port: number | undefined = undefined;
    private path: string = '';
    private query: string = '';
    private fragment: string = '';

    public static fromString(string: string): Uri {
        const url = new URL(string);

        return new Uri()
            .withScheme(url.protocol.substr(0, url.protocol.length - 1))
            .withUserInfo(url.username, url.password !== '' ? url.password : undefined)
            .withHost(url.hostname)
            .withPort(url.port ? parseInt(url.port) : undefined)
            .withPath(url.pathname !== '/' ? url.pathname : '')
            .withQuery(url.search ? url.search.substr(1) : '')
            .withFragment(url.hash ? url.hash.substr(1) : '');
    }

    public getSchema(): string {
        return this.schema;
    }

    public withScheme(schema: string): this {
        const uri = this.clone();
        uri.schema = schema;

        return uri;
    }

    public getUserInfo(): string {
        return this.userInfo;
    }

    public withUserInfo(user: string, password?: string): this {
        const uri = this.clone();
        uri.userInfo = password !== undefined ? user + ':' + password : user;

        return uri;
    }

    public getHost(): string {
        return this.host;
    }

    public withHost(host: string): this {
        const uri = this.clone();
        uri.host = host;

        return uri;
    }

    public getPort(): number | undefined {
        const isPortNeeded = !(
            (this.schema === 'http' && this.port === 80) ||
            (this.schema === 'https' && this.port === 443)
        );

        return isPortNeeded ? this.port : undefined;
    }

    public withPort(port: number | undefined): this {
        const uri = this.clone();
        uri.port = port;

        return uri;
    }

    public getPath(): string {
        return this.path;
    }

    public withPath(path: string): this {
        const uri = this.clone();
        uri.path = path;

        return uri;
    }

    public getQuery(): string {
        return this.query;
    }

    public withQuery(query: string): this {
        const uri = this.clone();
        uri.query = query;

        return uri;
    }

    public getFragment(): string {
        return this.fragment;
    }

    public withFragment(fragment: string): this {
        const uri = this.clone();
        uri.fragment = fragment;

        return uri;
    }

    public getAuthority(): string {
        const port = this.getPort();

        return (this.userInfo ? this.userInfo + '@' : '') + this.host + (port ? ':' + port : '');
    }

    public toString(): string {
        return (
            this.schema +
            '://' +
            this.getAuthority() +
            this.path +
            (this.query ? '?' + this.query : '') +
            (this.fragment ? '#' + this.fragment : '')
        );
    }

    private clone(): this {
        return Object.assign(new Uri(), this);
    }
}

export default Uri;
