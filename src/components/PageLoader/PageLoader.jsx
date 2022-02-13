import { useApolloClient } from '@apollo/client';
import { Suspense, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import LoadingBar from '../LoadingBar/LoadingBar';

function PageLoader({
    queries,
    reactNode,
    useLoader,
}) {
    const client = useApolloClient();
    const params = useParams();

    async function executeQueries() {
        try {
            return await Promise.all(queries.map(
                (query) => client.query({ query, variables: params || {} }),
            ));
        } catch (error) {
            console.warn(error);
            return [];
        }
    }

    const memoizedQueryCallback = useCallback(executeQueries, [client, queries, params]);
    const isLoading = useLoader(memoizedQueryCallback);

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
