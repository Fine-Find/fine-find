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
