import { URLSearchParams } from 'url';

import { NextApiRequest, NextApiResponse } from 'next';

import { instagramApis } from '../../../../config/instagram';

// TODO: Add Error Handling
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (
    req.query == null ||
    req.query['mediaId'] == null ||
    Array.isArray(req.query['mediaId'])
  ) {
    res.status(400).json({ error: 'Expecting query parameter of mediaId' });
  }

  const dangerousMediaId = req.query['mediaId'];

  if (Array.isArray(dangerousMediaId)) {
    res.status(400).json({ error: 'Expecting query parameter of mediaId' });
  }

  const encodedMediaId = Array.isArray(dangerousMediaId)
    ? encodeURIComponent(dangerousMediaId[0])
    : encodeURIComponent(dangerousMediaId);

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

  const meUrl = `${instagramApis.media}${encodedMediaId}?${queryParameters}`;

  const response = await fetch(meUrl);
  const fetchedData = await response.json();

  res.status(200).json(fetchedData);
}
