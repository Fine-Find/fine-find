import { firebaseAdminAuth } from '@/config/firebaseAdmin';
import { NextApiResponse } from 'next';
import { FirebaseNextApiRequest } from 'types/FirebaseNextApiRequest';

/**
 * API Route Middleware that will check for a valid id token.
 * If no valid id token is found in Firebase then 401 is returned.
 *
 * @param handler the Next.js API Handler
 */
const withAuthMiddleware =
  (handler) => async (req: FirebaseNextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).end('Not authenticated. No Auth header');
    }

    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = await firebaseAdminAuth.verifyIdToken(token);
      if (!decodedToken || !decodedToken.uid)
        return res.status(401).end('Not authenticated');
      req.uid = decodedToken.uid;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.errorInfo);
      const errorCode = error.errorInfo.code;
      error.status = 401;
      if (errorCode === 'auth/internal-error') {
        error.status = 500;
      }
      //TODO handlle firebase admin errors in more detail
      res.status(error.status).json({ error: errorCode });
    }

    return handler(req, res);
  };

export default withAuthMiddleware;
