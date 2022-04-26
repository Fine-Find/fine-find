import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import mailgun from 'mailgun-js';
import { NextApiResponse } from 'next';

const DOMAIN = 'mg.thefinefind.com';
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: DOMAIN,
});

const sendEmail = async (req: FirebaseNextApiRequest, res: NextApiResponse) => {
  try {
    if (req.body) {
      const reqBody = JSON.parse(req.body);
      const data = {
        from: reqBody.from,
        to: reqBody.to,
        subject: reqBody.subject,
        html: reqBody.html,
      };
      mg.messages().send(data);
    }
    return res.status(200).end('Success');
  } catch (err) {
    res.status(500).end('Internal server error');
  }
};

/**
 * WARNING: do not call from client, only to be used by internal functions
 * Handles sending emails.
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
    const reqBody = JSON.parse(req.body);
    if (
      !('from' in reqBody) ||
      !('to' in reqBody) ||
      !('subject' in reqBody) ||
      (!('html' in reqBody) && !('body' in reqBody))
    ) {
      endMsg = 'Missing data';
      res.status(400);
    } else {
      return sendEmail(req, res);
    }
  } else {
    endMsg = 'Method not allowed';
    res.status(405);
  }
  res.end(endMsg);
};

export default handler;
