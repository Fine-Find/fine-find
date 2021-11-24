import { FirebaseError } from '@firebase/app';

export enum LoginErrorType {
  email,
  password,
  unknown,
}

export type LoginError = {
  type: LoginErrorType;
  message: string;
};

export const handleLoginError = (error: FirebaseError): LoginError => {
  switch (error.code) {
    case 'auth/invalid-email':
      return {
        type: LoginErrorType.email,
        message: 'The email address provided is not valid',
      };
    case 'auth/user-disabled':
      return {
        type: LoginErrorType.email,
        message: 'The email address for this user has been disabled',
      };
      break;
    case 'auth/user-not-found':
      return {
        type: LoginErrorType.password,
        message: 'The email address or password is incorrect',
      };
      break;
    case 'auth/wrong-password':
      return {
        type: LoginErrorType.password,
        message: 'The email address or password is incorrect',
      };
    default:
      return {
        type: LoginErrorType.unknown,
        message: 'An unknown error occurred, please try again',
      };
  }
};
