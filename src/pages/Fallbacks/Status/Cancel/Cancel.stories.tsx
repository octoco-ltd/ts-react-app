import type { Meta, StoryObj } from '@storybook/react';

import StatusCancel from './Cancel';

const meta: Meta<typeof StatusCancel> = {
    title: 'Pages/Status/StatusCancel',
    component: StatusCancel,
};

export default meta;
type Story = StoryObj<typeof StatusCancel>;

export const Primary: Story = {
    render: () => <StatusCancel />,
};
