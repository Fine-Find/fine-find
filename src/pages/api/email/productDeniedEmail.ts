import { FirebaseNextApiRequest } from '@/types/FirebaseNextApiRequest';
import { fineFindApis } from '@/utils/urls';
import { NextApiResponse } from 'next';
const { URL } = process.env;

const handler = async (req: FirebaseNextApiRequest, res: NextApiResponse) => {
  try {
    const reqBody = JSON.parse(req.body);
    await fetch(URL + fineFindApis.sendEmail, {
      method: 'POST',
      body: JSON.stringify(reqBody),
    });
  } catch (err) {
    res.status(500).end('Internal server error');
  }
};

export default handler;
