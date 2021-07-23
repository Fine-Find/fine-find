import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Button, Props } from './Button';

const meta: Meta = {
  title: 'Components/Button',
  component: Button,
};
export default meta;

const Template: Story<Props> = (args) => <Button {...args} />;
export const Default = Template.bind({});
