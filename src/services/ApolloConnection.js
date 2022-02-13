import {
    ApolloClient,
    defaultDataIdFromObject,
    InMemoryCache,
} from '@apollo/client';

const {
    REACT_APP_BACKEND_PROTOCOL,
    REACT_APP_BACKEND_PORT,
    REACT_APP_BACKEND_DOMAIN,
} = process.env;
const BACKEND_PORT = REACT_APP_BACKEND_PORT ? `:${REACT_APP_BACKEND_PORT}` : '';
const BACKEND_PREFIX_URL = `${REACT_APP_BACKEND_PROTOCOL}://${REACT_APP_BACKEND_DOMAIN}${BACKEND_PORT}`;

let LAST_RESPONSE_OBJECT_ID = -1;

function dataIdFromObject(responseObject) {
    LAST_RESPONSE_OBJECT_ID += 1;

    switch (responseObject.__typename) {
        case 'Page': return `Page:${LAST_RESPONSE_OBJECT_ID}`;
        default: return defaultDataIdFromObject(responseObject);
    }
}
class ApolloConnection extends ApolloClient {
    constructor() {
        super({
            uri: BACKEND_PREFIX_URL,
            cache: new InMemoryCache({ dataIdFromObject }),
        });
        this.baseUrl = BACKEND_PREFIX_URL;
    }
}

export default new ApolloConnection();
