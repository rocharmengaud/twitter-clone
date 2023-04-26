import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/libs/prismadb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// This is a utility function that takes a NextApiRequest object and uses the next-auth library to check if the user is authenticated.
// If the user is authenticated, it returns an object with the current user data. If the user is not authenticated, it throws an error.

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    throw new Error('Not signed in');
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
};

export default serverAuth;
