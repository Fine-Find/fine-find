import { shopifyApiClient } from '@/config/shopify';
import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import {
  GraphProductsResponse,
  productsGraphToShopifyProducts,
} from '@/types/shopify/Products';
import withAuthMiddleware from '@/utils/withAuthMiddleware';
import { NextApiResponse } from 'next';

/**
 * Handles the various types of incoming requests related to the user's instagram account
 * Based on the request type the logic is routed the appropriate function that will
 * make the respective API calls.
 *
 * Accepted Methods
 * GET
 * POST
 *
 * @param req API request
 * @param res API Response
 */
const handler = async (req: FirebaseNextApiRequest, res: NextApiResponse) => {
  if (req.method && req.method.toUpperCase() === 'GET') {
    return searchProducts(req, res);
  }
  res.status(405).end('Method not allowed');
};

async function searchProducts(
  req: FirebaseNextApiRequest,
  res: NextApiResponse
) {
  const title = req.query['title'];
  if (title === null || title === undefined) {
    res.status(400).end('Missing title query parameter');
  } else {
    const query = `{products(first:10 query:"title:${title}*") {
        edges{
          node{
            id,
            title,
            description,
            productType,
            images(first: 1) {
              edges{
                node{
                  originalSrc
                }
              }
            }
          }
        }
      }}`;
    try {
      const response: GraphProductsResponse = await shopifyApiClient.graphql(
        query
      );
      const simplifiedProducts = productsGraphToShopifyProducts(
        response.products
      );
      res.status(200).json(simplifiedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
}

export default withAuthMiddleware(handler);
