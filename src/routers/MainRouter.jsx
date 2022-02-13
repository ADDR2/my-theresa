import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Header from '../components/Header/Header';
import PageLoader from '../components/PageLoader/PageLoader';
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
                            reactNode={<Details />}
                            queries={[LOAD_ANIME_DETAILS]}
                            useLoader={useAnimeDetailsLoader}
                        />
                    )}
                />
                <Route
                    path="/staff/:staffId"
                    element={(
                        <PageLoader
                            reactNode={<Details />}
                            queries={[LOAD_STAFF_DETAILS]}
                            useLoader={useStaffDetailsLoader}
                        />
                    )}
                />
                <Route
                    path="/character/:characterId"
                    element={(
                        <PageLoader
                            reactNode={<Details />}
                            queries={[LOAD_CHARACTER_DETAILS]}
                            useLoader={useCharacterDetailsLoader}
                        />
                    )}
                />
            </Routes>
        </Router>
    );
}

export default MainRouter;
