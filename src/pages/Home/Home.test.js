import { useContext, useEffect } from 'react';
import {
    render,
    waitFor,
    screen,
    cleanup,
} from '../../../test-utils';
import AppContext from '../../components/App/Context';
import { NO_DATA_FOUND_MESSAGE } from '../../constants';
import Home from './Home';
import useHomeLoader from './Home.hooks';

afterEach(cleanup);
afterAll(() => jest.clearAllMocks());

jest.mock('../../components/CarouselItem/CarouselItem', () => (
    function Component() {
        return (<div role="carousel-sample-item" />);
    }
));

describe('Home Tests', () => {
    test('renders Home page with message when context has no data', async () => {
        render(<Home />);

        await waitFor(() => screen.getByRole('home-empty-container'));
        const homeContainer = screen.getByRole('home-empty-container');
        const messageContainer = screen.getByRole('heading');

        expect(homeContainer).toBeInTheDocument();
        expect(homeContainer).toHaveClass('home-empty-page');
        expect(messageContainer).toBeInTheDocument();
        expect(messageContainer).toHaveTextContent(NO_DATA_FOUND_MESSAGE);

        let errorLookingForHomeContainer = false;
        let errorLookingForCarouselContainer = false;

        try {
            screen.getAllByRole('home-container');
        } catch (error) {
            errorLookingForHomeContainer = true;
        }

        try {
            screen.getAllByRole('carousel-container');
        } catch (error) {
            errorLookingForCarouselContainer = true;
        }

        expect(errorLookingForHomeContainer).toEqual(true);
        expect(errorLookingForCarouselContainer).toEqual(true);
    });

    test('renders Home page when context has some data', async () => {
        const contextData = { media: [{ id: 4, bannerImage: 'image' }], characters: [{ id: 678, image: 'test' }] };
        render(<Home />, contextData);

        await waitFor(() => screen.getByRole('home-container'));
        const homeContainer = screen.getByRole('home-container');
        const carouselContainers = screen.getAllByRole('carousel-container');

        expect(homeContainer).toBeInTheDocument();
        expect(homeContainer).toHaveClass('home-page');
        expect(carouselContainers.length).toEqual(Object.keys(contextData).length);
    });

    test('does not render Home page when invalid context state', () => {
        let didFail = false;
        try {
            render(<Home />, null);
        } catch (error) {
            didFail = true;
        }

        expect(didFail).toEqual(true);
    });

    test('useHomeLoader should set to true isLoading prop', async () => {
        let currentState = { isLoading: false };
        const mockResults = [
            { data: { Page: { media: [] } } },
            { data: { Page: { staff: [] } } },
            { data: { Page: { characters: [] } } },
        ];
        const mockGraphQLCall = jest.fn(() => Promise.resolve(mockResults));
        const stateChanger = jest.fn((newState) => { currentState = newState; });
        function SampleComponent() {
            useHomeLoader(mockGraphQLCall);
            const [state] = useContext(AppContext);

            useEffect(
                () => {
                    stateChanger(state);
                },
                [state],
            );

            return (<div role="sample" />);
        }

        render(
            <SampleComponent />,
            currentState,
        );

        await waitFor(() => screen.getByRole('sample'));

        expect(mockGraphQLCall).toHaveBeenCalledTimes(1);
        expect(stateChanger).toHaveBeenCalledTimes(3);
        expect(stateChanger).toHaveBeenNthCalledWith(1, { isLoading: false });
        expect(stateChanger).toHaveBeenNthCalledWith(2, { isLoading: true });
    });

    test('useHomeLoader should store results with images in context', async () => {
        let currentState = { isLoading: false };
        const mockResults = [
            { data: { Page: { media: [{ id: 466, bannerImage: 'something' }] } } },
            { data: { Page: { staff: [{ id: 944, image: { large: 'test' } }, { id: 4 }] } } },
            { data: { Page: { characters: [] } } },
        ];
        const stateExpectedResult = {
            media: mockResults[0].data.Page.media,
            staff: mockResults[1].data.Page.staff
                .filter(({ image }) => !!image)
                .map((item) => ({ id: item.id, image: item.image.large })),
            characters: mockResults[2].data.Page.characters,
            isLoading: false,
        };
        const mockGraphQLCall = jest.fn(() => Promise.resolve(mockResults));
        const stateChanger = jest.fn((newState) => { currentState = newState; });
        function SampleComponent() {
            useHomeLoader(mockGraphQLCall);
            const [state] = useContext(AppContext);

            useEffect(
                () => {
                    stateChanger(state);
                },
                [state],
            );

            return <div role="sample" />;
        }

        render(
            <SampleComponent />,
            currentState,
        );

        await waitFor(() => screen.getByRole('sample'));

        expect(stateChanger).toHaveBeenNthCalledWith(3, stateExpectedResult);
        expect(currentState).toEqual(stateExpectedResult);
    });
});
