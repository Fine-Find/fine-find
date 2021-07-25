import { Card } from './';

export default {
  title: 'Component/Card',
  component: Card,
  argTypes: {
    title: { control: 'text' },
    paragraph: { control: 'text' },
    flipDirection: {
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
    rotateCard: {
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  paragraph: 'Lorem ipsum..............',
};
