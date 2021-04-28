import { URLSearchParams } from 'url';

import { NextApiRequest, NextApiResponse } from 'next';

import { instagramApis } from '../../../../config/instagram';

/* eslint-disable no-console */
// TODO: Add Error Handling
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const instagramAccessToken = process.env.INSTAGRAM_LONG_TOKEN; // TODO: Replace with getting the real token from FireBase.
  const queryParameters = new URLSearchParams({
    access_token: instagramAccessToken,
    fields: 'id,username',
  });

  const meUrl = `${instagramApis.me}?${queryParameters}`;

  const response = await fetch(meUrl);
  const fetchedData = await response.json();

  console.log(JSON.stringify(fetchedData));
  res.status(200).json(fetchedData);
}
