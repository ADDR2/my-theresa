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

const HOME_QUERY_IDS = {
    media: 1,
    staff: 2,
    characters: 3,
};

function dataIdFromObject(responseObject) {
    switch (responseObject.__typename) {
        case 'Page': {
            const homeQueryType = Object.keys(HOME_QUERY_IDS).find((key) => key in responseObject);
            return `Page:${HOME_QUERY_IDS[homeQueryType]}`;
        }
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
