import React, { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import AnimeDetails from '../components/AnimeDetails/AnimeDetails';
import CharacterDetails from '../components/CharacterDetails/CharacterDetails';
import Header from '../components/Header/Header';
import LoadingBar from '../components/LoadingBar/LoadingBar';
import PageLoader from '../components/PageLoader/PageLoader';
import StaffDetails from '../components/StaffDetails/StaffDetails';
import {
    useAnimeDetailsLoader,
    useStaffDetailsLoader,
    useCharacterDetailsLoader,
} from '../pages/Details/Details.hooks';
import {
    LOAD_ANIME_DETAILS,
    LOAD_CHARACTER_DETAILS,
    LOAD_STAFF_DETAILS,
} from '../pages/Details/Details.queries';
import ErrorPage from '../pages/Error/Error';
import { RESOURCE_NOT_FOUND, SERVICE_DOWN } from '../pages/Error/ErrorTypes';
import useHomeLoader from '../pages/Home/Home.hooks';
import { queriesToLoadHome } from '../pages/Home/Home.queries';
import {
    HOME_PATH,
    NOT_FOUND_PATH,
    SERVICE_DOWN_PATH,
} from './RoutePaths';

const Home = React.lazy(() => import('../pages/Home/Home'));
const Details = React.lazy(() => import('../pages/Details/Details'));
const WishList = React.lazy(() => import('../pages/WishList/WishList'));

function MainRouter() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route
                    path={HOME_PATH}
                    element={<PageLoader reactNode={<Home />} queries={queriesToLoadHome} useLoader={useHomeLoader} />}
                />
                <Route
                    path="/anime/:animeId"
                    element={(
                        <PageLoader
                            reactNode={<Details><AnimeDetails /></Details>}
                            queries={[LOAD_ANIME_DETAILS]}
                            useLoader={useAnimeDetailsLoader}
                        />
                    )}
                />
                <Route
                    path="/staff/:staffId"
                    element={(
                        <PageLoader
                            reactNode={<Details><StaffDetails /></Details>}
                            queries={[LOAD_STAFF_DETAILS]}
                            useLoader={useStaffDetailsLoader}
                        />
                    )}
                />
                <Route
                    path="/character/:characterId"
                    element={(
                        <PageLoader
                            reactNode={<Details><CharacterDetails /></Details>}
                            queries={[LOAD_CHARACTER_DETAILS]}
                            useLoader={useCharacterDetailsLoader}
                        />
                    )}
                />
                <Route
                    path="/wishlist"
                    element={<Suspense fallback={<LoadingBar />}><WishList /></Suspense>}
                />
                <Route
                    path={SERVICE_DOWN_PATH}
                    element={<ErrorPage message={SERVICE_DOWN} />}
                />
                <Route
                    path={NOT_FOUND_PATH}
                    element={<ErrorPage message={RESOURCE_NOT_FOUND} />}
                />
                <Route
                    path="*"
                    element={<ErrorPage message={RESOURCE_NOT_FOUND} />}
                />
            </Routes>
        </Router>
    );
}

export default MainRouter;
