import { ApolloProvider } from '@apollo/client';
import React, { useMemo, useState } from 'react';
import MainRouter from '../../routers/MainRouter';
import ApolloConnection from '../../services/ApolloConnection';
import AppContext from './Context';

function App() {
    const [appState, setAppState] = useState({});
    const memoizedState = useMemo(
        () => ([appState, setAppState]),
        [appState, setAppState],
    );

    return (
        <ApolloProvider client={ApolloConnection}>
            <AppContext.Provider value={memoizedState}>
                <MainRouter />
            </AppContext.Provider>
        </ApolloProvider>
    );
}

export default App;
