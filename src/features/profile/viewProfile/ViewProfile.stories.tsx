import type { Meta, StoryObj } from '@storybook/react';

import ViewProfile from './ViewProfile';

const meta: Meta<typeof ViewProfile> = {
    title: 'Features/List Pokemon',
    component: ViewProfile,
};

export default meta;
type Story = StoryObj<typeof ViewProfile>;

export const Primary: Story = {
    args: {},
};
