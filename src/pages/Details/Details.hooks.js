import { useContext, useEffect } from 'react';
import AppContext from '../../components/App/Context';

export function useAnimeDetailsLoader(graphQLCall = () => {}) {
    const [{ isLoading }, setAppState] = useContext(AppContext);

    useEffect(
        () => {
            setAppState((currentState) => ({ ...currentState, isLoading: true }));
            graphQLCall().then((queryResults) => {
                if (!queryResults) return;
                const [{ data: { Media } }] = queryResults;

                setAppState((currentState) => ({
                    ...currentState,
                    currentDetails: {
                        title: Media.title.english,
                        description: Media.description,
                        image: Media.bannerImage,
                    },
                    lastAnimeDetails: Media,
                    isLoading: false,
                }));
            });
        },
        [graphQLCall, setAppState],
    );

    return isLoading;
}

export function useStaffDetailsLoader(graphQLCall = () => {}) {
    const [{ isLoading }, setAppState] = useContext(AppContext);

    useEffect(
        () => {
            setAppState((currentState) => ({ ...currentState, isLoading: true }));
            graphQLCall().then((queryResults) => {
                if (!queryResults) return;
                const [{ data: { Staff } }] = queryResults;

                setAppState((currentState) => ({
                    ...currentState,
                    currentDetails: {
                        title: Staff.name.full,
                        description: Staff.description,
                        image: Staff.image.large,
                    },
                    lastStaffDetails: Staff,
                    isLoading: false,
                }));
            });
        },
        [graphQLCall, setAppState],
    );

    return isLoading;
}

export function useCharacterDetailsLoader(graphQLCall = () => {}) {
    const [{ isLoading }, setAppState] = useContext(AppContext);

    useEffect(
        () => {
            setAppState((currentState) => ({ ...currentState, isLoading: true }));
            graphQLCall().then((queryResults) => {
                if (!queryResults) return;
                const [{ data: { Character } }] = queryResults;

                setAppState((currentState) => ({
                    ...currentState,
                    currentDetails: {
                        title: Character.name.full,
                        description: Character.description,
                        image: Character.image.large,
                    },
                    lastCharacterDetails: Character,
                    isLoading: false,
                }));
            });
        },
        [graphQLCall, setAppState],
    );

    return isLoading;
}
