import { useRouter } from 'next/router';
import { BsTwitter } from 'react-icons/bs';

export const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push('/')}
      className="h-14 w-14 hover:bg-blue-300 hover:bg-opacity-10 flex items-center justify-center p-4 transition rounded-full cursor-pointer"
    >
      <BsTwitter size={28} color="white" />
    </div>
  );
};
