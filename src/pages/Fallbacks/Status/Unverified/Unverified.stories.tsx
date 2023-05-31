import type { Meta, StoryObj } from '@storybook/react';

import Unverified from './Unverified';

const meta: Meta<typeof Unverified> = {
  title: 'Pages/Status/Status 500',
  component: Unverified,
};

export default meta;
type Story = StoryObj<typeof Unverified>;

export const Primary: Story = {
  render: () => <Unverified />,
};