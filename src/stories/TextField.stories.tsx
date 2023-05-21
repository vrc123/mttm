import { StoryFn, Meta } from '@storybook/react';

import TextField from '../components/TextField';

export default {
    title: 'TextField',
    component: TextField,
    argTypes: {
        id: { control: '-'},
        onChange: { control: '-' },
    },
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args) => <TextField {...args} />;

export const Empty = Template.bind({});

Empty.args = {
    placeholder: 'Type here',
    value: '',
}

export const Filled = Template.bind({});

Filled.args = {
    placeholder: 'Type here',
    value: 'Text',
}