import { CssBaseline } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import router from 'src/router/router';
import initFirebase from './features/authentication/clients/firebaseConfig/firebase';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { selectTheme } from './store/theme/themeSlice';
import { themeNames } from './store/theme/themeSlice.contracts';
import ThemeProvider from './theme/ThemeProvider';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { persistAuth } from './features/authentication/services/persistAuth';

function App() {
    const content = useRoutes(router);
    const theme = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();
    
    //if firebase is used directly for authentication
    initFirebase(
        process.env.REACT_APP_DEPLOYMENT_ENV ?? 'development'
    );

    useEffect(() => {
        const prep = async () => {
            await dispatch(persistAuth({}));
        };
        prep();
      }, []);

    return (
        <ThemeProvider>
            <CssBaseline/>
            <ToastContainer hideProgressBar={true} theme={theme === themeNames.dark ? 'dark' : 'light'}/>
            {content}
        </ThemeProvider>
    );
}

export default App;
