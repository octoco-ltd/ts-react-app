import type { Meta, StoryObj } from '@storybook/react';

import { Table } from './Table';
import { columns, rows } from './storyData';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Primary: Story = {
    args: {
      rows: rows,
      columns: columns, 
      pageSizeOptions: [5,10,20,50],
      loading: false
    },
};