import type { Meta, StoryObj } from '@storybook/react';

import LoadingComponent from '../LoadingComponent';

const meta: Meta<typeof LoadingComponent> = {
    title: 'Loading',
    tags: ['autodocs'],
    component: LoadingComponent,
};

export default meta;
type Story = StoryObj<typeof LoadingComponent>;
export const Loading: Story = {
    args: {}
};