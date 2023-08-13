import { Outlet } from 'react-router-dom'
import ErrorBoundary from './webpages/errors/ErrorBoundary.jsx'
import { store } from './states';
import { StoreProvider } from 'easy-peasy';
import ProgressBar from './components/elements/ProgressBar.jsx';


function App() {
    const Website = window.Website;

    if (Website && !store.getState().website.data) {
        store.getActions().website.setWebsite(Website)
    }

    return (
        <>
            <StoreProvider store={store}>
                <ProgressBar>
                    <ErrorBoundary>
                        <Outlet />
                    </ErrorBoundary>
                </ProgressBar>
            </StoreProvider>
        </>
    )
}

export default App
