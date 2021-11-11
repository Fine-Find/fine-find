import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import { fineFindApis } from '@/utils/urls';
import { NextApiResponse } from 'next';
const { URL } = process.env;

async function sendEmail(data) {
  const messageText = `
        <!DOCTYPE html>
        <html>
        <head></head>
        <body>
            <p>First Name: ${data.firstName}</p>
            <p>Last Name: ${data.lastName}</p>
            <p>Firm: ${data.firm}</p>
            <p>Location: ${data.location}</p>
            <p>Website: ${data.website}</p>
            <p>Instagram Handle: ${data.instagramHandle}</p>
            <p>Email: ${data.email}</p>
            <p>Phone: ${data.phone}</p>
            <p>Top Vendors: ${data.topVendors}</p>
            <p>Other Details: ${data.letUsKnow}</p>
        </body>
        </html>
    `;
  const messageData = {
    from: 'Fine Find Concierge <concierge@thefinefind.com>',
    to: 'blaine@thefinefind.com',
    subject: 'New Designer Application',
    html: messageText,
  };
  const bodyData = {
    ...data,
    ...messageData,
  };

  await fetch(URL + fineFindApis.sendEmail, {
    method: 'POST',
    body: JSON.stringify(bodyData),
  });
}

/**
 * Handles application submissions
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
    if (!('email' in reqBody)) {
      res.status(400).end('Missing data');
    } else {
      sendEmail(reqBody);
      res.status(200).end('Success');
    }
  }
  res.status(405).end('Method not allowed');
};

export default handler;
