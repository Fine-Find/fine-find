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
    return res.status(200).end('Success');
  } catch (err) {
    res.status(500).end(err);
  }
};

export default handler;
