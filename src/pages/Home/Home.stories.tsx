import type { Meta, StoryObj } from '@storybook/react';

import HomePage from './Home';

const meta: Meta<typeof HomePage> = {
  title: 'Pages/Home Page',
  component: HomePage,
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Primary: Story = {
  render: () => <HomePage />,
};