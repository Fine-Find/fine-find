import { firebaseAdminDb } from '@/config/firebaseAdmin';
import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import { firebaseCollections } from '@/utils/firebaseCollections';
import { fineFindApis } from '@/utils/urls';
import { NextApiResponse } from 'next';
const { URL } = process.env;

async function approveApplication(applicationId: any) {
  const applicationRef = firebaseAdminDb
    .collection(firebaseCollections.applications)
    .doc(applicationId);
  const doc = await applicationRef.get();
  if (!doc.exists) {
    return false;
  } else {
    await applicationRef.update({ approved: true });
    await sendEmails(doc.data().email, applicationId);

    return true;
  }
}
async function sendEmails(email, applicationId) {
  const externalMessageText = buildExternalMessageHtml(applicationId);
  const externalMessageData = buildMessageData(
    email,
    'Welcome to The Fine Find',
    externalMessageText
  );

  await fetch(URL + fineFindApis.sendEmail, {
    method: 'POST',
    body: JSON.stringify(externalMessageData),
  });
}

function buildExternalMessageHtml(applicationId) {
  const signUpLink = createSignUpLink(applicationId);
  return `
        <!DOCTYPE html>
        <html>
        <head></head>
        <body>
            <p>We are excited to welcome you into The Fine Find family! Please use the following link to sign up:</p>
            <a href="${signUpLink}">${signUpLink}</a>
        </body>
        </html>
    `;
}
function createSignUpLink(applicationId: any) {
  const approvalLink = URL + '/signup?id=' + applicationId;
  return approvalLink;
}
function buildMessageData(to: string, subject: string, html: string) {
  return {
    from: 'Fine Find Concierge <concierge@thefinefind.com>',
    to: to,
    subject: subject,
    html: html,
  };
}

/**
 * Handles application approval
 *
 * Accepted Methods
 * POST
 *
 * @param req API request
 * @param res API Response
 */
const handler = async (req: FirebaseNextApiRequest, res: NextApiResponse) => {
  if (req.method && req.method.toUpperCase() === 'GET') {
    const reqQuery = req.query;
    if (!('id' in reqQuery)) {
      res.status(400).end('Missing data');
    } else {
      const applicationId = reqQuery.id;
      const applicationApproved = await approveApplication(applicationId);
      if (applicationApproved) {
        res.status(200).end('Application Approved');
      } else {
        res.status(403).end('ID not valid');
      }
    }
  }
  res.status(405).end('Method not allowed');
};

export default handler;
