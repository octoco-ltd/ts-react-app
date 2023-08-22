import type { Meta, StoryObj } from '@storybook/react';

import StatusSuccess from './Success';

const meta: Meta<typeof StatusSuccess> = {
    title: 'Pages/Status/StatusSuccess',
    component: StatusSuccess,
};

export default meta;
type Story = StoryObj<typeof StatusSuccess>;

export const Primary: Story = {
    render: () => <StatusSuccess />,
};
