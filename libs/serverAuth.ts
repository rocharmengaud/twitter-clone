import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '@/libs/prismadb';

// This is a utility function that takes a NextApiRequest object and uses the next-auth library to check if the user is authenticated.
// If the user is authenticated, it returns an object with the current user data. If the user is not authenticated, it throws an error.

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

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
