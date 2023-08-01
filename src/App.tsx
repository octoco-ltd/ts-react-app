import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import router from 'src/router/router';
import defineAbilityFor from './config/ability';
import { AbilityContext } from './contexts/canContext';
import DialogProvider from './contexts/dialogContext';
import { env } from './env';
import initFirebase from './features/authentication/clients/firebaseConfig/firebase';
import { persistAuth } from './features/authentication/services/persistAuth';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { selectTheme } from './store/theme/themeSlice';
import { themeNames } from './store/theme/themeSlice.contracts';
import ThemeProvider from './theme/ThemeProvider';
import { ErrorBoundary } from 'react-error-boundary';
import Status500 from './pages/Fallbacks/Status/Status500/Status500';

function App() {
    const content = useRoutes(router);
    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();
    
    //if firebase is used directly for authentication
    initFirebase(
        env.REACT_APP_DEPLOYMENT_ENV ?? 'development'
    );

    useEffect(() => {
        const prep = async () => {
            await dispatch(persistAuth({}));
        };
        prep();
      }, []);

      const ability = defineAbilityFor('admin');

    return (
        <ThemeProvider>
            <ErrorBoundary 
                FallbackComponent={Status500}
                // onError={(error, errorInfo) => errorService.log({ error, errorInfo })}
                onReset={() => {
                    // reset the state of your app
                    window.location.reload();
                }}
            >
                <AbilityContext.Provider value={ability}>
                    <CssBaseline/>
                    <DialogProvider>
                        <ToastContainer theme={theme === themeNames.dark ? 'dark' : 'light'}/>
                        {content}
                    </DialogProvider>
                </AbilityContext.Provider>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
