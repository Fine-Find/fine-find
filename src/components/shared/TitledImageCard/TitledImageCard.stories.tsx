import { TitledImageCard } from './';

export default {
  title: 'Component/TitledImageCard',
  component: TitledImageCard,
  argTypes: {
    title: { control: 'text' },
    subTitle: { control: 'text' },
    buttonText: {
      control: { type: 'text' },
    },
    imgSrc: {
      table: { disable: true },
    },
  },
};

const Template = (args) => (
  <TitledImageCard {...args}>
    <div>
      <p>This is some sample content</p>
    </div>
  </TitledImageCard>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  subTitle: 'Lorem ipsum..............',
  buttonText: 'Save',
};

export const NoButton = Template.bind({});
NoButton.args = {
  title: 'NoButton',
  subTitle: 'There should be no button',
};

export const TitleAbove = Template.bind({});
TitleAbove.args = {
  title: 'Title Above',
  subTitle: 'Title is above the image',
  titlePosition: 'above',
};
