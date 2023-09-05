import { CssBaseline } from '@mui/material';
import * as Sentry from '@sentry/react';
import { wrapUseRoutes } from '@sentry/react';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from 'src/router/router';
import defineAbilityFor from './config/ability';
// import { sentryConfig } from './config/sentry';
import { AbilityContext } from './context/canContext';
import DialogProvider from './context/dialogContext';
import { AuthProvider } from './features/authentication/context/AuthContext';
import { AuthService } from './features/authentication/services/AuthenticationService';
import { useAppSelector } from './hooks/hooks';
import Status500 from './pages/Fallbacks/Status/Status500/Status500';
import { selectTheme } from './store/theme/themeSlice';
import { themeNames } from './store/theme/themeSlice.contracts';
import ThemeProvider from './theme/ThemeProvider';
import { FirebaseAuthProvider } from './features/authentication/clients/firebase/FirebaseAuthProvider';
import { CognitoAuthProvider } from './features/authentication/clients/cognito/CognitoAuthProvider';

// Sentry.init(sentryConfig);
const useSentryRoutes = wrapUseRoutes(useRoutes);

function App() {
    const content = useSentryRoutes(router);
    const theme = useAppSelector(selectTheme);
    const ability = defineAbilityFor('superAdmin'); //TODO: the user role should be added here

    const authService = new AuthService(new CognitoAuthProvider()); //Auth0AuthProvider | FirebaseAuthProvider

    return (
        <AuthProvider authService={authService}>
            <ThemeProvider>
                <Sentry.ErrorBoundary
                    fallback={<Status500 resetErrorBoundary={() => window.location.reload()} />}
                >
                    <AbilityContext.Provider value={ability}>
                        <CssBaseline />
                        <DialogProvider>
                            <ToastContainer theme={theme === themeNames.dark ? 'dark' : 'light'} />
                            {content}
                        </DialogProvider>
                    </AbilityContext.Provider>
                </Sentry.ErrorBoundary>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
