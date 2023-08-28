import IconButton from '@mui/material/IconButton';
// import AddList from './AddList';
import { Save } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import AddList from './AddList';

export default function TopBar({
  onLayoutSave,
  items,
  onRemoveItem,
  onAddItem,
  originalItems,
  heading,
  canEdit
}: any) {

  return (
    <Box sx={{mx: 1, mt: 3}}>
      <Typography variant='h1'>
        {heading}
      </Typography>
      {canEdit &&
        <>
          <AddList
            items={items}
            onRemoveItem={onRemoveItem}
            onAddItem={onAddItem}
            originalItems={originalItems}
          />
          <IconButton aria-label="save" onClick={onLayoutSave}>
            <Save />
          </IconButton>
        </>
      }
    </Box>
  );
}
