import * as Yup from 'yup';

const phoneRegex = /^$|^\+1\s\(([0-9]{3})\)\s([0-9]{3})[-]([0-9]{4})$/;

export const basicApplyValidation = Yup.object().shape({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  firm: Yup.string().required('Please enter your firm'),
  location: Yup.string().required('Please enter your location'),
  website: Yup.string().required('Please enter your website'),
  instagramHandle: Yup.string().required('Please enter your Instagram handle'),
  topVendors: Yup.string().required('Please enter your top vendors'),
  letUsKnow: Yup.string(),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  phone: Yup.string().optional().matches(phoneRegex, {
    message: 'Please enter a phone number in the format of +1 (999) 999-9999',
  }),
});
