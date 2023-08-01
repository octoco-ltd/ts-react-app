import UserAvatar from './UserAvatar';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Avatar/UserAvatar',
    component: UserAvatar,
    argTypes: {},
} as ComponentMeta<typeof UserAvatar>;

const Template: ComponentStory<typeof UserAvatar> = (props) => <UserAvatar {...props} />;

export const Default = Template.bind({});
