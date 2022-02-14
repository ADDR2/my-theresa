import React, { useMemo, useState } from 'react';
import { render } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import AppContext from './src/components/App/Context';
import ApolloConnection from './src/services/ApolloConnection';

function providerGenerator(initialState) {
    return function AllTheProviders({ children }) {
        const [appState, setAppState] = useState(initialState);
        const memoizedState = useMemo(
            () => ([appState, setAppState]),
            [appState, setAppState],
        );
    
        return (
            <ApolloProvider client={ApolloConnection}>
                <AppContext.Provider value={memoizedState}>
                    { children }
                </AppContext.Provider>
            </ApolloProvider>
        );
    }
}

function customRender(ui, initialState = {}, options) {
    return render(ui, { wrapper: providerGenerator(initialState), ...options });
}

export * from '@testing-library/react';
export { customRender as render };