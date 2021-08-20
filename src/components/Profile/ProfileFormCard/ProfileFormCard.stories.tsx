import { ProfileFormCard } from './';

export default {
  title: 'Profile/ProfileFormCard',
  component: ProfileFormCard,
  argTypes: {
    title: { control: 'text' },
    subTitle: { control: 'text' },
    buttonText: {
      control: { type: 'text' },
    },
  },
};

const Template = (args) => (
  <ProfileFormCard {...args}>
    <div>
      <p>This is some sample content</p>
    </div>
  </ProfileFormCard>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  subTitle: 'Lorem ipsum..............',
  buttonText: 'Save',
};
