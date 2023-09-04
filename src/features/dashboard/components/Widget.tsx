import { Box, Paper } from '@mui/material';
import { ReactNode } from 'react';
import { IDashboardComponent } from '../models/dashboardTypes';

interface Props {
  id: string
  onRemoveItem: (itemId: string) => void
  component: ReactNode
  showBorder: boolean | undefined
}

export default function Widget({ id, onRemoveItem, showBorder, component: Item, }: Props) {
  return (
    showBorder ?
      <Paper sx={{ width: '100%', height: '100%' }} key={id}>
        {Item}
      </Paper> :
      <Box sx={{ width: '100%', height: '100%' }} key={id}>
        {Item}
      </Box>
  );
}
