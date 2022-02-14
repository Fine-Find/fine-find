/* eslint-disable no-console */
import { shopifyApiClient } from '@/config/shopify';
import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import { DesignerPage } from '@/types/shopify/Designer';
import withAuthMiddleware from '@/utils/withAuthMiddleware';
import { NextApiResponse } from 'next';

/**
 * Handles the various types of incoming requests related to the designers's shopify page
 * Based on the request type the logic is routed the appropriate function that will
 * make the respective API calls.
 *
 * Accepted Methods
 * POST
 *
 * @param req API request
 * @param res API Response
 */
const handler = async (req: FirebaseNextApiRequest, res: NextApiResponse) => {
  if (req.method && req.method.toUpperCase() === 'POST') {
    return createDesignerPage(req, res);
  }
  res.status(405).end('Method not allowed');
};

async function createDesignerPage(
  req: FirebaseNextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body);
    const requestBody: DesignerPage = JSON.parse(req.body) as DesignerPage;
    await shopifyApiClient.page.create(requestBody);
    return res.status(200).end();
  } catch (err) {
    console.error(err);
    console.error(err.response.body);
    return res.status(500).json(err);
  }
}

export default withAuthMiddleware(handler);
