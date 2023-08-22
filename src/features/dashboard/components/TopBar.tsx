import React from 'react';
import Card from '@mui/material/Card';
import { makeStyles } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
// import AddList from './AddList';
import { Save } from '@mui/icons-material';
import AddList from './AddList';

export default function TopBar({
  onLayoutSave,
  items,
  onRemoveItem,
  onAddItem,
  originalItems
}: any) {

  
  return (
    <Card>
      <AddList
        items={items}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        originalItems={originalItems}
      />
      <IconButton aria-label="save" onClick={onLayoutSave}>
        <Save />
      </IconButton>
    </Card>
  );
}
