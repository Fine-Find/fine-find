import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import mailgun from 'mailgun-js';
import { NextApiResponse } from 'next';

const DOMAIN = 'mg.thefinefind.com';
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: DOMAIN,
});

function sendEmail(req: FirebaseNextApiRequest, res: NextApiResponse) {
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
  return Promise.resolve(res.status(200).end('Success'));
}

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
  if (req.method && req.method.toUpperCase() === 'POST') {
    const reqBody = JSON.parse(req.body);
    if (
      !('from' in reqBody) ||
      !('to' in reqBody) ||
      !('subject' in reqBody) ||
      (!('html' in reqBody) && !('body' in reqBody))
    ) {
      res.status(400).end('Missing data');
    } else {
      return sendEmail(req, res);
    }
  }
  res.status(405).end('Method not allowed');
};

export default handler;
