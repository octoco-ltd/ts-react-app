import React from 'react';
import { HomeWrapper } from './Home.styles';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import WelcomeComponent from './components/WelcomeComponent';

const HomePage = () => {
    return (
        <HomeWrapper>
            <Helmet>
                <title>Home Page</title>
            </Helmet>
            <Container maxWidth='lg'>
                <WelcomeComponent />
            </Container>
        </HomeWrapper>
    );
};

export default HomePage;
