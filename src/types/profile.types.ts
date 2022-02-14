export type BasicProfileType = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  state: string;
  country: string;
};

export type BusinessProfileType = {
  companyName: string;
  description: string;
  website: string;
  hourlyRate?: number;
};

export type ApplicationType = {
  firstName: string;
  lastName: string;
  firm: string;
  location: string;
  website: string;
  instagramHandle: string;
  topVendors: string;
  letUsKnow: string;
  email: string;
  phone?: string;
};

export type UserOnboarding = {
  welcome: boolean;
  profileImage: boolean;
  basicProfile: boolean;
  businessImage: boolean;
  businessProfile: boolean;
  pageCreated: boolean;
};

export interface UserType {
  email: string;
  name: string;
  uid: string;
  shopifyUrl?: string;
  basicProfile?: BasicProfileType;
  businessImage?: string;
  businessProfile?: BusinessProfileType;
  profileImage?: string;
  onboarding?: UserOnboarding;
  application?: ApplicationType;
  [key: string]: any;
}
