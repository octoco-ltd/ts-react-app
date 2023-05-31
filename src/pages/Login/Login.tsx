import { Grid } from '@mui/material';
import { Login } from 'src/features/authentication/components/login';

export const LoginPage = () => {
  return (
    <Grid container 
      // direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '70vh' }}
    >
      <Grid item md={4}>
        <Login />
      </Grid>
    </Grid>
  )
}

export default LoginPage;
