import { firebaseAdminDb } from '@/config/firebaseAdmin';
import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import { firebaseCollections } from '@/utils/firebaseCollections';
import { NextApiResponse } from 'next';

async function checkApplication(applicationId: string) {
  const applicationRef = firebaseAdminDb
    .collection(firebaseCollections.applications)
    .doc(applicationId);
  const doc = await applicationRef.get();
  if (!doc.exists) {
    // eslint-disable-next-line no-console
    console.log('No such document!');
    return false;
  } else if (!doc.data().approved) {
    // eslint-disable-next-line no-console
    console.log('Application not approved');
    return false;
  } else if (doc.data().consumed) {
    // eslint-disable-next-line no-console
    console.log('Application link already used');
    return false;
  } else {
    // eslint-disable-next-line no-console
    await applicationRef.update({ consumed: true });
    return true;
  }
}

/**
 * Handles application verification
 *
 * Accepted Methods
 * POST
 *
 * @param req API request
 * @param res API Response
 */
const handler = async (req: FirebaseNextApiRequest, res: NextApiResponse) => {
  let endMsg = '';
  if (req.method && req.method.toUpperCase() === 'POST') {
    const id = JSON.parse(req.body);
    if (!id) {
      endMsg = 'Missing data';
      res.status(400);
    } else {
      const applicationId = id;
      const isValid = await checkApplication(applicationId);
      if (isValid) {
        endMsg = 'Success';
        res.status(200);
      } else {
        endMsg = 'Application link is not valid.';
        res.status(403);
      }
    }
  } else {
    endMsg = 'Method not allowed';
    res.status(405);
  }
  res.end(endMsg);
};

export default handler;
