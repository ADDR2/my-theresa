import { useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';

const useLoaderMock = (emitter) => (
    (graphQLCall) => {
        const [isLoading, setLoading] = useState(true);

        useEffect(
            () => {
                graphQLCall().then((results) => {
                    if (emitter) emitter.emit('call-finished', results);
                    if (results && results.length) {
                        act(() => setLoading(false));
                    }
                });
            },
            [graphQLCall, setLoading],
        );

        return isLoading;
    }
);

export default useLoaderMock;
