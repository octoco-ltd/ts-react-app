import { Close } from '@mui/icons-material';
import { Card, Typography, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem'
  },
  spacer: {
    flexGrow: 1
  },
  body: {
    padding: '0.5rem',
    flexGrow: 1
  }
});

export default function Widget({ id, onRemoveItem, component: Item }: any) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.body}>
        <Item />
      </div>
    </Card>
  );
}
