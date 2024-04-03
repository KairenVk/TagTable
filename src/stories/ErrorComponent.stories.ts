import type { Meta, StoryObj } from '@storybook/react';

import ErrorComponent from '../ErrorComponent';

const meta: Meta<typeof ErrorComponent> = {
    title: 'Error',
    tags: ['autodocs'],
    component: ErrorComponent,
};

export default meta;
type Story = StoryObj<typeof ErrorComponent>;
export const Error: Story = {
    args: {
        responseObject: {
            error_id: 404,
            error_name: "not_found",
            error_message: "No tags found"
        }
    }
};