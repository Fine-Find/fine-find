import { firebaseAdminDb } from '@/config/firebaseAdmin';
import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import { firebaseCollections } from '@/utils/firebaseCollections';
import { NextApiResponse } from 'next';

async function migrateApplication(applicationId: string, userId: string) {
  const applicationRef = firebaseAdminDb
    .collection(firebaseCollections.applications)
    .doc(applicationId);
  const applicationDoc = await applicationRef.get();
  const userDocRef = firebaseAdminDb
    .collection(firebaseCollections.users)
    .doc(userId);
  userDocRef.update({
    application: applicationDoc.data(),
    onboarding: {
      welcome: false,
      profileImage: false,
      basicProfile: false,
      businessImage: false,
      businessProfile: false,
    },
  });
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
    const migration = JSON.parse(req.body);
    if (!migration) {
      res.status(400).end('Missing data');
    } else {
      await migrateApplication(migration.applicationId, migration.userId);
      res.status(200).end('Success');
    }
  }
  res.status(405).end('Method not allowed');
};

export default handler;
