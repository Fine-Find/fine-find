import { InstagramTokenResponse } from './client/InstagramTokenResponse';

export interface InstagramToken extends InstagramTokenResponse {
  iat: number;
  exp: number;
}
