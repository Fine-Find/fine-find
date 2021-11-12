import * as Yup from 'yup';

export const basicRequestValidation = Yup.object().shape({
  productType: Yup.string().required('Please enter your product type'),
  vendorName: Yup.string().required('Please enter your vendor name'),
  productName: Yup.string().required('Please enter your product name'),
  linkToProduct: Yup.string(),
  vendorContactInfo: Yup.string(),
  description: Yup.string(),
});
