import * as Yup from 'yup';

// eslint-disable-next-line no-useless-escape
const urlRegex =
  // eslint-disable-next-line no-useless-escape
  /^(https?:\/\/)?(www\.)?([-a-zA-Z0-9@:%._\+~#=]{1,256}\.)[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;

export const businessProfileValidation = Yup.object().shape({
  companyName: Yup.string().required(`Please enter your company's name`),
  description: Yup.string().required(
    'Please provide a brief summary of your company'
  ),
  website: Yup.lazy((value) => {
    if (value !== '') {
      return Yup.string()
        .matches(urlRegex, 'Please provide a valid url')
        .required();
    }
    return Yup.string().notRequired();
  }),
  allowBooking: Yup.boolean(),
  hourlyRate: Yup.lazy((value) => {
    if (value !== '') {
      return Yup.number()
        .positive('Hourly rate must be a positive value')
        .min(1, 'Minimum rate is $1 an hour')
        .required();
    }
    return Yup.string().notRequired();
  }),
});
