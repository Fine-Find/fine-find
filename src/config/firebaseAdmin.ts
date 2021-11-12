import * as firebaseAdmin from 'firebase-admin';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

const firebaseAdminAuth = firebaseAdmin.auth();
const firebaseAdminDb = firebaseAdmin.firestore();
const firebaseAdminStorage = firebaseAdmin.storage();

export { firebaseAdminAuth, firebaseAdminDb, firebaseAdminStorage };
