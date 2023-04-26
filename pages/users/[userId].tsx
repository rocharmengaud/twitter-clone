import { Header } from '@/components/Header';
import { UserBio } from '@/components/users/UserBio';
import { UserHero } from '@/components/users/UserHero';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/router';
import { ClipLoader } from 'react-spinners';

const UserView = () => {
  const router = useRouter();
  // This works because of the file structure and NextJS (refering to [userId])
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  // To test out the loader we can just say if (true)
  if (isLoading || !fetchedUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label={fetchedUser?.name} showBackArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
    </>
  );
};

export default UserView;