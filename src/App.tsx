import React from 'react';
import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import router from 'src/router/router';
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from './hooks/hooks';
import { useRoutes } from 'react-router-dom';
import { selectTheme } from './store/theme/themeSlice';
import { themeNames } from './store/theme/themeSlice.contracts';

function App() {
    const content = useRoutes(router);
    const theme = useAppSelector(selectTheme);

    return (
        <ThemeProvider>
            <CssBaseline/>
            <ToastContainer hideProgressBar={true} theme={theme === themeNames.dark ? 'dark' : 'light'}/>
            {content}
        </ThemeProvider>
    );
}

export default App;
