import { URLSearchParams } from 'url';

import { NextApiRequest, NextApiResponse } from 'next';

import { instagramApis } from '../../../../config/instagram';

// TODO: Add Error Handling
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mediaFields = [
    'id',
    'username',
    'media_url',
    'media_type',
    'caption',
    'permalink',
    'timestamp',
  ];
  const instagramAccessToken = process.env.INSTAGRAM_LONG_TOKEN; // TODO: Replace with getting the real token from FireBase.
  const queryParameters = new URLSearchParams({
    access_token: instagramAccessToken,
    fields: `${mediaFields},children{id,media_type,media_url,permalink,timestamp}`,
  });

  const meUrl = `${instagramApis.myMedia}?${queryParameters}`;

  const response = await fetch(meUrl);
  const fetchedData = await response.json();

  res.status(200).json(fetchedData);
}
