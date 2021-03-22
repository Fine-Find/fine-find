import firebase from 'firebase';

import { LoginData } from './components/forms/LoginForm';
import { SignUpData } from './components/forms/SignUpForm';

export type AuthEmission = {
  isInitialized: boolean;
  user: any;
  signUp: ({ name, email, password }: SignUpData) => Promise<any>;
  signIn: ({
    email,
    password,
  }: LoginData) => Promise<firebase.User | { error: any } | any>;
  getUserAdditionalData: (userToGet: firebase.User) => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
};

export type FirebaseAuthProviderState = AuthEmission;
