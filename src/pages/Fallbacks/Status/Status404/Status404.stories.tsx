import type { Meta, StoryObj } from '@storybook/react';

import Status404 from './Status404';

const meta: Meta<typeof Status404> = {
  title: 'Pages/Status/Status 404',
  component: Status404,
};

export default meta;
type Story = StoryObj<typeof Status404>;

export const Primary: Story = {
  render: () => <Status404 />,
};