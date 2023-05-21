import type { Meta, StoryObj } from '@storybook/react';

import LoginPage from './Login';

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/Auth/Login',
  component: LoginPage,
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Primary: Story = {
  render: () => <LoginPage />,
};