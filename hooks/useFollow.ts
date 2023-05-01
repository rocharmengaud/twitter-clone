import { useCallback, useMemo } from 'react';
import useCurrentUser from './useCurrentUser';
import { useLoginModal } from './useLoginModal';
import useUser from './useUser';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  // Declare a variable isFollowing by using the useMemo hook to memoize the isFollowing state.
  // This variable checks whether the current user follows the user with the given userId
  // by checking if the userId is included in the current user's followingIds list.
  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser?.followingIds, userId]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen;
    }

    try {
      let request;

      if (isFollowing) {
        // Axios treats DELETE(query) and POST(body) differently
        request = () => axios.delete('/api/follow', { params: { userId } });
      } else {
        request = () => axios.post('/api/follow', { userId });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();

      toast.success('Success');
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, loginModal.onOpen, isFollowing, userId, mutateCurrentUser, mutateFetchedUser]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
