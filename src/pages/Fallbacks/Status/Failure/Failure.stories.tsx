import type { Meta, StoryObj } from '@storybook/react';

import StatusFailure from './Failure';

const meta: Meta<typeof StatusFailure> = {
    title: 'Pages/Status/StatusFailure',
    component: StatusFailure,
};

export default meta;
type Story = StoryObj<typeof StatusFailure>;

export const Primary: Story = {
    render: () => <StatusFailure />,
};
