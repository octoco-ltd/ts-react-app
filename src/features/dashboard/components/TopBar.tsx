import IconButton from '@mui/material/IconButton';
import { Save } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import AddList from './AddList';

interface Props {
  onLayoutSave: any,
  items: any,
  onRemoveItem: any,
  onAddItem: any,
  originalItems: any,
  heading: string,
  canEdit: boolean,
  autoSave?: boolean,
}

export default function TopBar({
  onLayoutSave,
  items,
  onRemoveItem,
  onAddItem,
  originalItems,
  heading,
  canEdit,
  autoSave
}: Props) {

  return (
    <Box sx={{ mx: 1, mt: 3 }}>
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
          {!autoSave &&
            <IconButton aria-label="save" onClick={onLayoutSave}>
              <Save />
            </IconButton>
          }
        </>
      }
    </Box>
  );
}
