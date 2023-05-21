import type { Meta, StoryObj } from '@storybook/react';

import Status500 from './Status500';

const meta: Meta<typeof Status500> = {
  title: 'Pages/Status/Status 500',
  component: Status500,
};

export default meta;
type Story = StoryObj<typeof Status500>;

export const Primary: Story = {
  render: () => <Status500 />,
};