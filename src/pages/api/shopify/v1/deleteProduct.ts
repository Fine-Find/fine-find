/* eslint-disable no-console */
import { shopifyApiClient } from '@/config/shopify';
import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import { DesignerProduct } from '@/types/shopify/Designer';
import withAuthMiddleware from '@/utils/withAuthMiddleware';
import { NextApiResponse } from 'next';

/**
 * Handles the various types of incoming requests related to the designers's shopify product
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
  if (req.method && req.method.toUpperCase() === 'DELETE') {
    return createDesignerProduct(req, res);
  }
  console.error('==========>method', req.method);
  res.status(405).end('Method not allowed');
};

async function createDesignerProduct(
  req: FirebaseNextApiRequest,
  res: NextApiResponse
) {
  try {
    console.error('==========>req', req.body);
    const requestBody: DesignerProduct = JSON.parse(
      req.body
    ) as DesignerProduct;
    console.error('==========>json', requestBody);
    const shopifyRes = await shopifyApiClient.product.delete(requestBody.id);
    console.error('---->done', shopifyRes);
    return res.status(200).json(shopifyRes);
  } catch (err) {
    return res.status(500).json(err);
  }
}

export default withAuthMiddleware(handler);
