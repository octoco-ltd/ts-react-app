import { ComponentStory, ComponentMeta } from '@storybook/react';

import ThemeSwitch from './ThemeSwitch';

export default {
  title: 'Components/Theme Switch',
  component: ThemeSwitch,
  argTypes: {},
} as ComponentMeta<typeof ThemeSwitch>;

const Template: ComponentStory<typeof ThemeSwitch> = (args: any) =>
  <ThemeSwitch {...args} />

export const StatusComingSoonPrimary = Template.bind({});
StatusComingSoonPrimary.args = {
  children: <ThemeSwitch />,
};
