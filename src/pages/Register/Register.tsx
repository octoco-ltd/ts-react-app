import { Grid } from '@mui/material'
import { Register } from 'src/features/authentication/components/register'

export const RegisterPage = () => {
  return (
    <Grid container 
      // direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '70vh' }}
    >
      <Grid item md={4}>
        <Register />
      </Grid>
    </Grid>
  )
}

export default RegisterPage