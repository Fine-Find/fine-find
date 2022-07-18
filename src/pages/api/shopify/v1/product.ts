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
  const type = req.query['type'];
  if (req.method && req.method.toUpperCase() === 'POST') {
    if (type === 'collection') {
      return createCollection(req, res);
    } else if (type === 'collectionupdate') {
      const id = req.query['id'];
      return updateCollection(req, res, id);
    } else {
      return createDesignerProduct(req, res);
    }
  }
  res.status(405).end('Method not allowed');
};

async function createDesignerProduct(
  req: FirebaseNextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log('==========>req', req.body);
    const requestBody: DesignerProduct = JSON.parse(
      req.body
    ) as DesignerProduct;
    await shopifyApiClient.product.create(requestBody);
    return res.status(200).end();
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function createCollection(
  req: FirebaseNextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestBody: DesignerProduct = JSON.parse(
      req.body
    ) as DesignerProduct;
    const results = await shopifyApiClient.customCollection.create(requestBody);
    return res.status(200).json(results);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function updateCollection(
  req: FirebaseNextApiRequest,
  res: NextApiResponse,
  id: any
) {
  try {
    const requestBody: DesignerProduct = JSON.parse(
      req.body
    ) as DesignerProduct;
    const results = await shopifyApiClient.customCollection.update(
      id,
      requestBody
    );
    return res.status(200).json(results);
  } catch (err) {
    return res.status(500).json(err);
  }
}

export default withAuthMiddleware(handler);
