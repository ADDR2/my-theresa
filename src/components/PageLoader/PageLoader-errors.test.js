import { render, screen, cleanup } from '../../../test-utils';
import PageLoader from './PageLoader';
import { getServerMocked, serverCases } from './__mock__/graphQLServer';
import { LOAD_ANIME_IMAGES } from '../../pages/Home/Home.queries';
import { useLoaderMock } from './__mock__/stubs';
import { EventEmitter } from 'events';

jest.mock('react-router-dom', () => {
    const useParamsMock = jest.fn(() => ({}));
    const navigationMock = jest.fn();
    const useNavigateMock = () => navigationMock;

    return { useParams: useParamsMock, useNavigate: useNavigateMock };
});

const { useParams: useParamsMock, useNavigate: useNavigateMock } = require('react-router-dom');
const server = getServerMocked(serverCases.BAD_REQUEST);

describe('PageLoader Happy Path Tests', () => {
    beforeAll(() => server.listen());
    afterEach(() => {
        useParamsMock.mockClear();
        useNavigateMock().mockClear();
        server.resetHandlers();

        return cleanup();
    });
    afterAll(() => {
        jest.clearAllMocks();
        server.close();
    });

    test('should navigate to Error page when a query fails', async () => {
        const emitter = new EventEmitter();

        render(
            <PageLoader
                queries={[ LOAD_ANIME_IMAGES ]}
                reactNode={<div role="sample" />}
                useLoader={useLoaderMock(emitter)}
            />
        );

        await new Promise(resolve => emitter.once('call-finished', resolve));

        const loadingContainer = screen.getByRole('loading-container');

        expect(loadingContainer).toBeInTheDocument();
        expect(useParamsMock).toHaveBeenCalledTimes(1);
        expect(useNavigateMock()).toHaveBeenCalledTimes(1);

        emitter.removeAllListeners('call-finished');
    });
});