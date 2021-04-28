import { URLSearchParams } from 'url';

import { NextApiRequest, NextApiResponse } from 'next';

import { instagramApis } from '../../../../config/instagram';

/* eslint-disable no-console */
// TODO: Add Error Handling
// TODO: Pagination
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const instagramAccessToken = process.env.INSTAGRAM_LONG_TOKEN; // TODO: Replace with getting the real token from FireBase.
  const queryParameters = new URLSearchParams({
    access_token: instagramAccessToken,
    fields: 'id,username,media_url,media_type',
  });

  const meUrl = `${instagramApis.myMedia}?${queryParameters}`;

  const response = await fetch(meUrl);
  const fetchedData = await response.json();

  res.status(200).json(fetchedData);
}
