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
import useHomeLoader from '../pages/Home/Home.hooks';
import { queriesToLoadHome } from '../pages/Home/Home.queries';

const Home = React.lazy(() => import('../pages/Home/Home'));
const Details = React.lazy(() => import('../pages/Details/Details'));
const WishList = React.lazy(() => import('../pages/WishList/WishList'));

function MainRouter() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route
                    path="/"
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
            </Routes>
        </Router>
    );
}

export default MainRouter;
