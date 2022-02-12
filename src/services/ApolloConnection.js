import { ApolloClient, InMemoryCache } from '@apollo/client';

const {
    REACT_APP_BACKEND_PROTOCOL,
    REACT_APP_BACKEND_PORT,
    REACT_APP_BACKEND_DOMAIN,
} = process.env;
const BACKEND_PORT = REACT_APP_BACKEND_PORT ? `:${REACT_APP_BACKEND_PORT}` : '';
const BACKEND_PREFIX_URL = `${REACT_APP_BACKEND_PROTOCOL}://${REACT_APP_BACKEND_DOMAIN}${BACKEND_PORT}`;

class ApolloConnection extends ApolloClient {
    constructor() {
        super({ uri: BACKEND_PREFIX_URL, cache: new InMemoryCache() });
        this.baseUrl = BACKEND_PREFIX_URL;
    }
}

export default new ApolloConnection();
