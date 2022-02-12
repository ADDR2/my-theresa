import React, { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Header from '../components/Header/Header';

const Home = React.lazy(() => import('../pages/Home/Home'));

function MainRouter() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={(
                        <Suspense fallback={<div />}>
                            <Home />
                        </Suspense>
                    )}
                />
            </Routes>
        </Router>
    );
}

export default MainRouter;
