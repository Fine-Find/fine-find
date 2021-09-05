import { FormProvider, useForm } from 'react-hook-form';

import { ProfileFormCard as Card } from './';

export default {
  title: 'Profile/Profile Form Card',
  component: Card,
  argTypes: {
    title: { control: 'text' },
    subTitle: { control: 'text' },
    buttonText: {
      control: { type: 'text' },
    },
  },
};

const Template = (args) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Card {...args}>
        <div>
          <p>This is some sample content</p>
        </div>
      </Card>
    </FormProvider>
  );
};

export const ProfileFormCard = Template.bind({});
ProfileFormCard.args = {
  title: 'Title',
  subTitle: 'Lorem ipsum..............',
  buttonText: 'Save',
};
