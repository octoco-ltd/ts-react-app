import { Box, Button, Card, Container, Divider, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Logo from 'src/components/LogoSign';

import { styled } from '@mui/material/styles';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSetContinue from 'src/hooks/useSetContinue';

const MainContent = styled(Box)(
    () => `
  height: 100%;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,
);

function StatusFailure() {
    const {handleRedirect, mode} = useSetContinue()

    return (
        <>
            <Helmet>
                <title>Status - Success</title>
            </Helmet>
            <MainContent>
                <Container maxWidth='md'>
                    <Logo />
                    <Box textAlign='center'>
                        <Container maxWidth='sm'>
                            <Typography variant='h2' sx={{ mt: 4, mb: 2 }}>
                                Oops, something went wrong!
                            </Typography>
                            <Typography
                                variant='h4'
                                color='text.secondary'
                                fontWeight='normal'
                                sx={{ mb: 4 }}
                            >
                                Unfortunately, there was a problem with your{' '}
                                {mode ? mode : 'transaction'}.
                            </Typography>
                        </Container>
                        <img alt='Maintenance' height={250} src='/static/images/status/fail.svg' />
                    </Box>
                    <Container maxWidth='sm'>
                        <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
                            <Button onClick={handleRedirect} variant='outlined'>
                                Continue
                            </Button>
                        </Card>
                    </Container>
                    <Divider sx={{ my: 4 }} />
                </Container>
            </MainContent>
        </>
    );
}

export default StatusFailure;
