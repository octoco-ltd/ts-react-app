import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const HomeWrapper = styled(Box)(
    () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`,
);