/* eslint-disable no-useless-escape */
import * as Yup from 'yup';

export const createCollectionValidation = Yup.object().shape({
  title: Yup.string().required(`Please enter a title for the collection`),
  description: Yup.string().notRequired(),
  image: Yup.mixed().required('Please select an image'),
});
