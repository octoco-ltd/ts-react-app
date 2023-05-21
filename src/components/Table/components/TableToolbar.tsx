import { RefreshOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import {
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
} from '@mui/x-data-grid';

interface Props {
  refetch: () => void;
  isFetching: boolean;
}

export function TableToolbar({ refetch, isFetching }: Props) {
  return (
    <GridToolbarContainer sx={{ justifyContent: 'left' }}>
      <GridToolbarDensitySelector />
      <GridToolbarFilterButton />
      <Box position='absolute' sx={{'right': '2px'}}>
      {refetch && (
        <IconButton onClick={() => refetch()}>
          <RefreshOutlined
            sx={
              isFetching
                ? {
                    color: 'blue',
                    animation: 'spin 2s linear infinite',
                    '@keyframes spin': {
                      '100%': {
                        transform: 'rotate(360deg)',
                      },
                      '0%': {
                        transform: 'rotate(0deg)',
                      },
                    },
                  }
                : { color: 'green' }
            }
          />
        </IconButton>
      )}
      </Box>
    </GridToolbarContainer>
  );
}

export default TableToolbar;