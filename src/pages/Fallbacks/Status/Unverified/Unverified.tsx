import {
    Box,
    Container,
    Card,
    Grid,
    Typography,
    Link,
    CircularProgress, Skeleton,
  } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from 'src/components/LogoSign';
import ThemeSwitch from 'src/components/ThemeSwitch/ThemeSwitch';

  const OverviewWrapper = styled(Box)(
    () => `
      overflow: auto;
      flex: 1;
      overflow-x: hidden;
      align-items: center;
  `,
  );

  const PageContent = () => {
    const [displayName, setDisplayName] = useState('');
  
    // useEffect(() => {
    //   if (!loading && data?.user?.name) {
    //     setDisplayName(data.user.name);
    //   }
    //   else {
    //     setDisplayName(user?.displayName ?? user?.email?.split('@')[0] ?? '');
    //   }
    // }, [data, user])
  
    // const resendHandler = async () => {
    //   if (user) {
    //     await sendEmailVerificationLink(user);
    //   }
    // }
  
    return (
      <Container maxWidth='lg' sx={{ textAlign: 'center' }}>
        <Grid spacing={{ xs: 6, md: 10 }} justifyContent='center' alignItems='center' container>
          <Grid item md={10} lg={8} mx='auto'>
            <Typography sx={{ mb: 2 }} variant='h1'>
              {/* {loading? <Skeleton /> : `Welcome ${displayName}. Your email address is unverified.`} */}
            </Typography>
            <Typography
              sx={{ lineHeight: 1.5, pb: 4 }}
              variant='h4'
              color='text.secondary'
              fontWeight='normal'
            >
              {/* {loading? <Skeleton /> : `Please go to your inbox and click on the verification link that was sent to ${user?.email ?? ''}. Once verified, you will be able to access the platform.`} */}
            </Typography>
            <Grid item md={10} lg={8} mx='auto' style={{ marginTop: 15 }}>
              <Typography variant='subtitle2'>
                {'Don\'t receive an email? '}
                <Link
                  href='#'
                  underline='hover'
                //   onClick={resendHandler}
                >
                  {'Resend confirmation link. '}
                </Link>
              </Typography>
            </Grid>
            <Grid item md={10} lg={8} mx='auto' style={{ marginTop: 15 }}>
              <Typography variant='subtitle2'>
                {'Not your email address? '}
                <Link
                  href='/login'
                  underline='hover'
                //   onClick={logout}
                >
                  {'Sign Out.'}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  function Unverified() {
    // const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const location = useLocation();
  
    const navigatePathname = useMemo(() => {
      const state = location.state as { from: Location };
  
      if (state && state.from) {
        return state.from;
      }
  
      return '/dashboards';
    }, [location]);
  
    // useEffect(() => {
    //   if (!user) {
    //     navigate('/login')
    //   }
    //   else if (user?.emailVerified ?? false) {
    //     navigate(navigatePathname);
    //   }
    // }, [user]);
  
    return (
      <OverviewWrapper>
        <Helmet>
          <title>Reonet: Verify Email</title>
        </Helmet>
        <Container maxWidth='lg'>
          <Box display='flex' justifyContent='center' py={5} alignItems='center'>
            {/* <Logo /> */}
            <Box style={{ position: 'absolute', top: 15, right: 15 }}>
              <ThemeSwitch />
            </Box>
          </Box>
          <Card sx={{ p: 10, mb: 10, borderRadius: 10 }}>
            Unverified
            {/* {loading? <CircularProgress /> : <PageContent />} */}
          </Card>
        </Container>
      </OverviewWrapper>
    );
  }
  
  export default Unverified;
  