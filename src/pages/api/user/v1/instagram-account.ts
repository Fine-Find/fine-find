import { firebaseAdminDb } from '@/config/firebaseAdmin';
import { firebaseCollections } from '@/utils/firebaseCollections';
import withAuthMiddleware from '@/utils/withAuthMiddleware';
import { NextApiResponse } from 'next';
import { FirebaseNextApiRequest } from 'types/FirebaseNextApiRequest';
import { CreateInstagramAccountRequest } from 'types/Instagram/client/CreateInstagramAccountRequest';

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
  if (req.method && req.method.toUpperCase() === 'POST') {
    return createInstagramAccount(req, res);
  }
  res.status(405).end('Method not allowed');
};

// TODO: Encrypt the access token prior to storage in the DB
async function createInstagramAccount(
  req: FirebaseNextApiRequest,
  res: NextApiResponse
) {
  if (req.body) {
    const accountDetails: CreateInstagramAccountRequest = JSON.parse(req.body);
    try {
      await firebaseAdminDb
        .collection(firebaseCollections.users)
        .doc(req.uid)
        .update({
          instagram: {
            ...accountDetails,
          },
        });

      res.status(204).end('No Content');
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(400).end('Missing Request Body');
  }
}

export default withAuthMiddleware(handler);
