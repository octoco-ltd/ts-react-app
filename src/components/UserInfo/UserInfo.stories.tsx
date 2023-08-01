import UserInfo from './UserInfo';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Cards/UserInfo',
    component: UserInfo,
    argTypes: {},
} as ComponentMeta<typeof UserInfo>;

const Template: ComponentStory<typeof UserInfo> = () => <UserInfo />;

export const Default = Template.bind({});
