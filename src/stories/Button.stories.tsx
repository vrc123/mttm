import { StoryFn, Meta } from '@storybook/react';

import Button from '../components/Button';

export default {
    title: 'Button',
    component: Button,
    argTypes: {
        onClick: { control: "-" },
    },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    variant: 'primary',
    label: 'Label',
}

export const Secondary = Template.bind({});

Secondary.args = {
    variant: 'secondary',
    label: 'Label',
}

export const Delete = Template.bind({});

Delete.args = {
    variant: 'delete',
    label: 'Label',
}