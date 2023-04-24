import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

// This is a custom hook that uses the useSWR library to fetch the current user from the /api/current endpoint.
// This code can be used when you need to fetch the currently logged-in user's information in a Next.js app that uses NextAuth for authentication.
// It returns an object with the current user data, any errors that occurred, a loading state, and a mutate function to update the data.

// By using this hook, I can easily access the current user's data in my components.
// The hook will automatically update the data when the user's session changes (login/out).

const useCurrentUser = () => {
  // The useCurrentUser hook uses the SWR library to fetch data from the /api/current endpoint,
  // which is an API route that is protected by server-side authentication using the getSession function provided by NextAuth.
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
