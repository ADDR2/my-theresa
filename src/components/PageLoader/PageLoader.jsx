import { useApolloClient } from '@apollo/client';
import {
    Suspense,
    useCallback,
    useEffect,
    useState,
} from 'react';
import PropTypes from 'prop-types';
import LoadingBar from '../LoadingBar/LoadingBar';
import './PageLoader.scss';

function PageLoader({ queries = [], reactNode }) {
    const client = useApolloClient();
    const [isLoading, setLoading] = useState(true);

    async function executeQueries() {
        try {
            const results = await Promise.all(queries.map((query) => client.query({ query })));
            return results;
        } catch (error) {
            console.warn(error);
            return [];
        }
    }

    const memoizedQueryCallback = useCallback(executeQueries, [client, queries]);

    useEffect(
        () => {
            memoizedQueryCallback().then(() => {
                setLoading(false);
            });
        },
        [memoizedQueryCallback],
    );

    if (isLoading) return <LoadingBar />

    return (
        <Suspense fallback={<LoadingBar />}>
            { reactNode }
        </Suspense>
    );
}

PageLoader.defaultProps = { queries: [] };
PageLoader.propTypes = { queries: PropTypes.arrayOf(PropTypes.any), reactNode: PropTypes.any.isRequired };

export default PageLoader;
