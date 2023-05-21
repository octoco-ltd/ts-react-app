import type { Meta, StoryObj } from '@storybook/react';

import { Register } from './index';

const meta: Meta<typeof Register> = {
  title: 'Components/auth/Register',
  component: Register,
};

export default meta;
type Story = StoryObj<typeof Register>;

export const Primary: Story = {
  render: () => <Register />,
};