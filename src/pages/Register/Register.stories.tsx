import type { Meta, StoryObj } from '@storybook/react';

import RegisterPage from './Register';

const meta: Meta<typeof RegisterPage> = {
  title: 'Pages/Auth/Register',
  component: RegisterPage,
};

export default meta;
type Story = StoryObj<typeof RegisterPage>;

export const Primary: Story = {
  render: () => <RegisterPage />,
};