import {
    useContext,
    useEffect,
    useState,
} from 'react';
import AppContext from '../../components/App/Context';

function doesItemHaveImage({ image, bannerImage }) {
    return image || bannerImage;
}

function getImage({ image: { large }, id }) {
    return { id, image: large };
}

function useHomeLoader(graphQLCall = () => {}) {
    const [isLoading, setLoading] = useState(true);
    const [, setAppState] = useContext(AppContext);

    useEffect(
        () => {
            graphQLCall().then((queryResults) => {
                const [mediaResponse, staffResponse, charactersResponse] = queryResults;
                const { data: { Page: { media } } } = mediaResponse;
                const { data: { Page: { staff } } } = staffResponse;
                const { data: { Page: { characters } } } = charactersResponse;

                setAppState((currentState) => ({
                    ...currentState,
                    media: media.filter(doesItemHaveImage),
                    staff: staff.filter(doesItemHaveImage).map(getImage),
                    characters: characters.filter(doesItemHaveImage).map(getImage),
                }));
                setLoading(false);
            });
        },
        [graphQLCall, setAppState],
    );

    return [isLoading, setLoading];
}

export default useHomeLoader;
