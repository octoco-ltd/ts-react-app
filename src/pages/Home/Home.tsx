import React from 'react';
import { HomeWrapper } from './Home.styles';
import { Helmet } from 'react-helmet-async';
import { Box, Container } from '@mui/material';
import WelcomeComponent from './components/WelcomeComponent';
import { Table } from 'src/components/Table/Table';
import ListPokemon from 'src/features/pokemon/components/listPokemon/ListPokemon';

const HomePage = () => {    
    return (
        <HomeWrapper>
            <Helmet>
                <title>Home Page</title>
            </Helmet>
            <Container maxWidth='lg'>
                <WelcomeComponent />
                <ListPokemon />
            </Container>
        </HomeWrapper>
    );
};

export default HomePage;