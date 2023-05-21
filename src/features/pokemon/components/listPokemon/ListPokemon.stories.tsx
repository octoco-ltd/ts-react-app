import type { Meta, StoryObj } from '@storybook/react';

import ListPokemon from './ListPokemon';

const meta: Meta<typeof ListPokemon> = {
  title: 'Features/List Pokemon',
  component: ListPokemon,
};

export default meta;
type Story = StoryObj<typeof ListPokemon>;

export const Primary: Story = {
    args: {},
};