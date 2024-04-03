import type { Meta, StoryObj } from '@storybook/react';

import TableComponent from '../TableComponent';

const meta: Meta<typeof TableComponent> = {
    title: 'Table',
    component: TableComponent,
    tags: ['autodocs'],
    argTypes: {
        rows: {
            control: 'select',
            options: [5, 10, 25, 50]
        }
    }
};

export default meta;
type Story = StoryObj<typeof TableComponent>;
export const Table: Story = {
    args: {
        rows: 5,
        orderDirection: 'asc',
        orderByColumn: 'name',
    }
};