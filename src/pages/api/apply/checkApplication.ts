import { firebaseAdminDb } from '@/config/firebaseAdmin';
import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import { firebaseCollections } from '@/utils/firebaseCollections';
import { NextApiResponse } from 'next';

async function checkApplication(applicationId: string) {
    console.log('application id:', applicationId)
  const applicationRef = firebaseAdminDb
    .collection(firebaseCollections.applications)
    .doc(applicationId);
  const doc = await applicationRef.get();
  if (!doc.exists) {
    console.log('No such document!');
    return false;
  } else if (!doc.data().approved) {
    console.log('Application not approved');
    return false;
  } else if (doc.data().consumed) {
    console.log('Application link already used');
    return false;
  } else {
    await applicationRef.update({ consumed: true });
    console.log('Document data:', doc.data());
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
  if (req.method && req.method.toUpperCase() === 'POST') {
    const id = JSON.parse(req.body);
    console.log('id', id);
    if (!id) {
      res.status(400).end('Missing data');
    } else {
      const applicationId = id;
      const isValid = await checkApplication(applicationId);
      if (isValid) {
        res.status(200).end('Success');
      } else {
        res.status(403).end('Application link is not valid.');
      }
    }
  }
  res.status(405).end('Method not allowed');
};

export default handler;
