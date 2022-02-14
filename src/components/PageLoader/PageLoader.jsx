import { useApolloClient } from '@apollo/client';
import { Suspense, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingBar from '../LoadingBar/LoadingBar';
import { NOT_FOUND_PATH, SERVICE_DOWN_PATH } from '../../routers/RoutePaths';
import { NOT_FOUND_REGEX } from '../../pages/Error/ErrorTypes';

function PageLoader({
    queries,
    reactNode,
    useLoader,
}) {
    const client = useApolloClient();
    const params = useParams();
    const navigate = useNavigate();

    async function executeQueries() {
        try {
            return await Promise.all(queries.map(
                (query) => client.query({ query, variables: params || {} }),
            ));
        } catch (error) {
            console.warn(error);
            navigate(NOT_FOUND_REGEX.test(error?.message) ? NOT_FOUND_PATH : SERVICE_DOWN_PATH);
            return null;
        }
    }

    const memoizedQueryCallback = useCallback(executeQueries, [client, queries, params, navigate]);
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
