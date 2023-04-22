import serverAuth from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';

// This is an API route that returns the current user data if the user is authenticated.
// It expects a GET request and uses the serverAuth function to check if the user is authenticated before returning the user data.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req);

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
