import type { Meta, StoryObj } from '@storybook/react';

import { StatusComingSoon } from './ComingSoon';

const meta: Meta<typeof StatusComingSoon> = {
  title: 'Pages/Status/Coming Soon',
  component: StatusComingSoon,
};

export default meta;
type Story = StoryObj<typeof StatusComingSoon>;

export const Primary: Story = {
  render: () => <StatusComingSoon />,
};