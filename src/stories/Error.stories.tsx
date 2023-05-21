import { StoryFn, Meta } from '@storybook/react';

import Error from '../components/Error';

export default {
    title: 'Error',
    component: Error,
    argTypes: {
        setError: { control: "-" },
    },
} as Meta<typeof Error>;

const Template: StoryFn<typeof Error> = (args) => <Error {...args} />;

export const Active = Template.bind({});

Active.args = {
    error: true
}