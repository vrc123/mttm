import { StoryFn, Meta } from '@storybook/react';

import SearchField from '../components/SearchField';

export default {
    title: 'SearchField',
    component: SearchField,
    argTypes: {
        id: { control: '-'},
        onChange: { control: '-' },
    },
} as Meta<typeof SearchField>;

const Template: StoryFn<typeof SearchField> = (args) => <SearchField {...args} />;

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