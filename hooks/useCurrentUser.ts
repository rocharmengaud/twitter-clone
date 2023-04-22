import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

// This is a custom hook that uses the useSWR library to fetch the current user from the /api/current endpoint.
// It returns an object with the current user data, any errors that occurred, a loading state, and a mutate function to update the data.

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
