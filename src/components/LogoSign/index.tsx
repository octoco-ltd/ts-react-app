import { Box, useTheme } from '@mui/material';
import { useAppSelector } from '../../hooks/hooks';
import { selectTheme } from '../../store/theme/themeSlice';

interface ILogoInterface {
  height?: number | string;
  width?: number | string;
}

function Logo(props: ILogoInterface) {
  const { height = 'auto', width = 'auto' } = props;

  const theme = useTheme();

  return (
    <Box>
      <img src={theme.palette.mode === 'dark' ? '/static/images/brand/Octoco Logo 8.svg' : '/static/images/brand/Octoco Logo 1.svg'} alt='Logo' height={height} width={width} />
    </Box>
  );
}

export default Logo;
