import serverAuth from '@/libs/serverAuth';
import { NextApiRequest, NextApiResponse } from 'next';

// Overall, this API route is used to check if the user is authenticated and returns the current user's data as a JSON response if they are.
// It expects a GET request and uses the serverAuth function to check if the user is authenticated before returning the user data.
// This is useful for displaying user-specific content or accessing user data in other parts of the application.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
