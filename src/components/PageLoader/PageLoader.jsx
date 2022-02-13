import { useApolloClient } from '@apollo/client';
import { Suspense, useCallback } from 'react';
import PropTypes from 'prop-types';
import LoadingBar from '../LoadingBar/LoadingBar';

function PageLoader({
    queries,
    reactNode,
    useLoader,
}) {
    const client = useApolloClient();

    async function executeQueries() {
        try {
            return await Promise.all(queries.map((query) => client.query({ query })));
        } catch (error) {
            console.warn(error);
            return [];
        }
    }

    const memoizedQueryCallback = useCallback(executeQueries, [client, queries]);
    const [isLoading] = useLoader(memoizedQueryCallback);

    if (isLoading) return <LoadingBar />

    return (
        <Suspense fallback={<LoadingBar />}>
            { reactNode }
        </Suspense>
    );
}

PageLoader.defaultProps = { queries: [], useLoader: () => {} };
PageLoader.propTypes = {
    queries: PropTypes.arrayOf(PropTypes.any),
    reactNode: PropTypes.any.isRequired,
    useLoader: PropTypes.func,
};

export default PageLoader;
