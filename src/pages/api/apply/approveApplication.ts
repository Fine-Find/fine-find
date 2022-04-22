import { firebaseAdminDb } from '@/config/firebaseAdmin';
import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import { firebaseCollections } from '@/utils/firebaseCollections';
import { fineFindApis } from '@/utils/urls';
import { NextApiResponse } from 'next';
const { URL } = process.env;

async function approveApplication(applicationId: any) {
  try {
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
  } catch (err) {
    return err;
  }
}
async function sendEmails(email, applicationId) {
  try {
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
  } catch (err) {
    return err;
  }
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
  try {
    let endMessage = '';
    if (req.method && req.method.toUpperCase() === 'GET') {
      const reqQuery = req.query;
      if (!('id' in reqQuery)) {
        endMessage = 'Missing data';
        res.status(400);
      } else {
        const applicationId = reqQuery.id;
        const applicationApproved = await approveApplication(applicationId);
        if (applicationApproved) {
          endMessage = 'Application Approved';
          res.status(200);
        } else {
          endMessage = 'ID not valid';
          res.status(403);
        }
      }
    } else {
      endMessage = 'Method not allowed';
      res.status(405);
    }
    res.end(endMessage);
  } catch (err) {
    res.status(500).end('Internal server error');
  }
};

export default handler;
