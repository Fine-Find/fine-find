import { NextApiRequest } from 'next';

export interface FirebaseNextApiRequest extends NextApiRequest {
  uid: string;
}
