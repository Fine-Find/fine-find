import * as Yup from 'yup';

const phoneRegex = /^$|^\+1\s\(([0-9]{3})\)\s([0-9]{3})[-]([0-9]{4})$/;

export const basicRequestValidation = Yup.object().shape({
  productType: Yup.string().required('Please enter your product type'),
  vendorName: Yup.string().required('Please enter your vendor name'),
  productName: Yup.string().required('Please enter your product name'),
  linkToProduct: Yup.string(),
  vendorContactInfo: Yup.string(),
  description: Yup.string(),
});
