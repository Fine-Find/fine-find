import { User, UserCredential } from 'firebase/auth';

import { LoginData } from '../components/forms/LoginForm';
import { SignUpData } from '../components/forms/SignUpForm';

export type AuthEmission = {
  isInitialized: boolean;
  user: any;
  userIdToken?: string;
  signUp: ({ name, email, password }: SignUpData) => Promise<any>;
  signIn: ({ email, password }: LoginData) => Promise<UserCredential>;
  getUserAdditionalData: (userToGet: User) => Promise<void>;
  firestoreSignOut: () => Promise<void>;
  sendFirestorePasswordResetEmail: (email: string) => Promise<void>;
};

export type FirebaseAuthProviderState = AuthEmission;
