import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Header from '../components/Header/Header';
import PageLoader from '../components/PageLoader/PageLoader';
import { queriesToLoadPage } from '../pages/Home/Home.queries';

const Home = React.lazy(() => import('../pages/Home/Home'));

function MainRouter() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<PageLoader reactNode={<Home />} queries={queriesToLoadPage} />}
                />
            </Routes>
        </Router>
    );
}

export default MainRouter;
