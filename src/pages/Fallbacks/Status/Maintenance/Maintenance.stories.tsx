import type { Meta, StoryObj } from '@storybook/react';

import Maintenance from './Maintenance';

const meta: Meta<typeof Maintenance> = {
  title: 'Pages/Status/Maintenance',
  component: Maintenance,
};

export default meta;
type Story = StoryObj<typeof Maintenance>;

export const Primary: Story = {
  render: () => <Maintenance />,
};