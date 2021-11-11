import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import mailgun from 'mailgun-js';
import { NextApiResponse } from 'next';

const DOMAIN = 'sandbox03ee53431bde406190ea61dddc4aa515.mailgun.org';
const mg = mailgun({
  apiKey: '22a04f8b9bb2648f4a0073978c4f3245-30b9cd6d-29465f8d',
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
    mg.messages().send(data, function (error, body) {});
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
