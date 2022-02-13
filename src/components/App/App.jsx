import { ApolloProvider } from '@apollo/client';
import React, { useMemo, useState } from 'react';
import MainRouter from '../../routers/MainRouter';
import ApolloConnection from '../../services/ApolloConnection';
import AppContext from './Context';

const PureMainRouter = React.memo(MainRouter);

function App() {
    const [appState, setAppState] = useState({ isLoading: true });
    const memoizedState = useMemo(
        () => ([appState, setAppState]),
        [appState, setAppState],
    );

    return (
        <ApolloProvider client={ApolloConnection}>
            <AppContext.Provider value={memoizedState}>
                <PureMainRouter />
            </AppContext.Provider>
        </ApolloProvider>
    );
}

export default App;
