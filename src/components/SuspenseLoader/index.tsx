import { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';

interface Props {
  message?: string;
}

function SuspenseLoader({ message }: Props) {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Stack 
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <CircularProgress size={64} disableShrink thickness={3} />
        <Typography variant='h2'>{message}</Typography>
      </Stack>
      
    </Box>
  );
}

export default SuspenseLoader;
