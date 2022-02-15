import {
    render,
    waitFor,
    screen,
    cleanup,
} from '../../../test-utils';
import PageLoader from './PageLoader';
import server from './__mock__/graphQLServer';
import { LOAD_ANIME_IMAGES } from '../../pages/Home/Home.queries';
import useLoaderMock from './__mock__/stubs';

jest.mock('react-router-dom', () => {
    const useParamsMock = jest.fn(() => ({}));
    const navigationMock = jest.fn();
    const useNavigateMock = () => navigationMock;

    return { useParams: useParamsMock, useNavigate: useNavigateMock };
});

const { useParams: useParamsMock, useNavigate: useNavigateMock } = require('react-router-dom');

describe('PageLoader Happy Path Tests', () => {
    beforeAll(() => server.listen());
    beforeEach(() => {
        useParamsMock.mockClear();
        useNavigateMock().mockClear();
        server.resetHandlers();

        return cleanup();
    });
    afterAll(() => {
        jest.clearAllMocks();
        server.close();
    });

    test('should render LoadingBar when useLoader says is loading', async () => {
        render(
            <PageLoader
                queries={[]}
                reactNode={<div role="sample" />}
                useLoader={useLoaderMock()}
            />,
        );

        await waitFor(() => screen.getByRole('loading-container'));

        const loadingContainer = screen.getByRole('loading-container');

        expect(loadingContainer).toBeInTheDocument();
        expect(useParamsMock).toHaveBeenCalledTimes(1);
        expect(useNavigateMock()).not.toHaveBeenCalled();
    });

    test('should render reactNode when finishes getting the data', async () => {
        render(
            <PageLoader
                queries={[LOAD_ANIME_IMAGES]}
                reactNode={<div role="sample" />}
                useLoader={useLoaderMock()}
            />,
        );

        await waitFor(() => screen.getByRole('sample'));

        const sampleContainer = screen.getByRole('sample');

        expect(sampleContainer).toBeInTheDocument();
        expect(useParamsMock).toHaveBeenCalledTimes(2);
        expect(useNavigateMock()).not.toHaveBeenCalled();
    });
});
