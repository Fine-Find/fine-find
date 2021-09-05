import * as Yup from 'yup';

const phoneRegex = /^$|^\+1\s\(([0-9]{3})\)\s([0-9]{3})[-]([0-9]{4})$/;

export const basicProfileValidation = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  phone: Yup.string().optional().matches(phoneRegex, {
    message: 'Please enter a phone number in the format of +1 (999) 999-9999',
  }),
  country: Yup.string().required('Please enter the name of your country'),
  state: Yup.string().required('Please select a state'),
});
