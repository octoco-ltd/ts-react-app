import { Container, Typography } from '@mui/material';

const WelcomeComponent = () => {
    return (
        <Container maxWidth='xs' >
            <Typography variant='h2' sx={{ mt: 4, mb: 2, textAlign: 'center' }}>
                Home Page
            </Typography>
        </Container>
    );
};

export default WelcomeComponent;
