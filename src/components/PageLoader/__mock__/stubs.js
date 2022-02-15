import { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";

export const useLoaderMock = (emitter) => {
    return (graphQLCall) => {
        const [isLoading, setLoading] = useState(true);
        
        useEffect(
            () => {
                graphQLCall().then(results => {
                    emitter && emitter.emit('call-finished', results);
                    if (results && results.length) {
                        act(() => setLoading(false));
                    }
                });
            },
            [graphQLCall, setLoading, emitter]
        );
    
        return isLoading;
    };
}