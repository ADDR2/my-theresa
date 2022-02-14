import { useContext, useEffect } from 'react';
import AppContext from '../App/Context';

function useTemplateLoader(graphQLCall = () => {}, callback = () => {}) {
    const [{ isLoading }, setAppState] = useContext(AppContext);

    useEffect(
        () => {
            setAppState((currentState) => ({ ...currentState, isLoading: true }));
            graphQLCall().then((results) => callback(setAppState, results));
        },
        [graphQLCall, setAppState, callback],
    );

    return isLoading;
}

export default useTemplateLoader;
