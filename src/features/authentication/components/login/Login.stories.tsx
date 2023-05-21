import type { Meta, StoryObj } from '@storybook/react';

import { Login } from './index';

const meta: Meta<typeof Login> = {
  title: 'Components/auth/Login',
  component: Login,
};

export default meta;
type Story = StoryObj<typeof Login>;

export const Primary: Story = {
  render: () => <Login />,
};