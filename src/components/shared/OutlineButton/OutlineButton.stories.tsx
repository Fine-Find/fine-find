import { Button } from '.';

export default {
  title: 'Component/Button',
  component: Button,
  argTypes: {
    label: { control: 'text' },
    textColor: { control: 'color' },
    borderColor: { control: 'color' },
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Apply now',
};
