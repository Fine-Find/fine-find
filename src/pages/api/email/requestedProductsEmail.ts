import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import { fineFindApis } from '@/utils/urls';
import { NextApiResponse } from 'next';
const { URL } = process.env;

function buildMessageData(to: string, subject: string, html: string) {
  return {
    from: 'Fine Find Concierge <concierge@thefinefind.com>',
    to: to,
    subject: subject,
    html: html,
  };
}

async function buildInternalMessageHtml(data: any) {
  return `
        <!DOCTYPE html>
        <html>
        <head></head>
        <body>
            <b>${data.user.name}</b> has requested the following products:
            <p>Designer email: ${data.user.email}</p>

                ${data.requestedProducts.map((product) => {
    return `
        <ul>
            <li>Product Name: ${product.productName}</li>
            <li>Product Type: ${product.productType}</li>
            <li>Vendor Name: ${product.vendorName}</li>
            <li>Vendor Contacts: ${product.vendorContactInfo ?? data.user.email}</li>
        </ul>
        <br/>`;
  })}
        </body>
        </html>
    `;
}

async function sendEmails(data) {
  const conciergeMessageText = await buildInternalMessageHtml(data);
  const conciergeMessageData = buildMessageData(
    'concierge@thefinefind.com, blaine@thefinefind.com, renepromesse@gmail.com',
    `${data.requestedProducts.length ?? ''} Products Requested`,
    conciergeMessageText
  );
  await fetch(URL + fineFindApis.sendEmail, {
    method: 'POST',
    body: JSON.stringify(conciergeMessageData),
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
  try {
    if (req.method && req.method.toUpperCase() === 'POST') {
      const reqBody = JSON.parse(req.body);
      if (!('email' in reqBody.user)) {
        return res.status(400).end('Missing data');
      } else {
        await sendEmails(reqBody);

        return res.status(200).end('Success');
      }
    }
    return res.status(405).end('Method not allowed');
  } catch (err) {
    res.status(500).end('Internal server error');
  }
};

export default handler;
