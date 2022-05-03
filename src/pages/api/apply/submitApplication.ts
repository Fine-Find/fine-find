import { firebaseAdminDb } from '@/config/firebaseAdmin';
import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import { firebaseCollections } from '@/utils/firebaseCollections';
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

function createApprovalLink(recordId: any) {
  const approvalLink = URL + '/api/apply/approveApplication?id=' + recordId;
  return approvalLink;
}

async function buildInternalMessageHtml(data: any, recordId) {
  const approvalLink = await createApprovalLink(recordId);
  return `
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
            <p>Would you like to approve this application? If so click this link. It will automatically email the client with an approval email and signup information: <a href="${approvalLink}">${approvalLink}</a></p>
        </body>
        </html>
    `;
}

function buildExternalMessageHtml() {
  return `
        <!DOCTYPE html>
        <html>
        <head></head>
        <body>
            <p>Thank you for applying to The Fine Find.</p>
        </body>
        </html>
    `;
}

async function sendEmails(data, recordId) {
  const conciergeMessageText = await buildInternalMessageHtml(data, recordId);
  const conciergeMessageData = buildMessageData(
    'concierge@thefinefind.com, blaine@thefinefind.com, renepromesse@gmail.com,mheir299@gmail.com',
    'New Designer Application',
    conciergeMessageText
  );
  await fetch(URL + fineFindApis.sendEmail, {
    method: 'POST',
    body: JSON.stringify(conciergeMessageData),
  });

  const externalMessageText = buildExternalMessageHtml();
  const externalMessageData = buildMessageData(
    data.email,
    'Thank you for applying!',
    externalMessageText
  );
  await fetch(URL + fineFindApis.sendEmail, {
    method: 'POST',
    body: JSON.stringify(externalMessageData),
  });
}

async function addRecords(reqBody: any) {
  const metaData = {
    approved: false,
    consumed: false,
  };
  const recId = await firebaseAdminDb
    .collection(firebaseCollections.applications)
    .add({
      ...reqBody,
      ...metaData,
    });
  return recId.id;
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
      if (!('email' in reqBody)) {
        return res.status(400).end('Missing data');
      } else {
        const recordId = await addRecords(reqBody);
        await sendEmails(reqBody, recordId);

        return res.status(200).end('Success');
      }
    }
    return res.status(405).end('Method not allowed');
  } catch (err) {
    res.status(500).end('Internal server error');
  }
};

export default handler;
