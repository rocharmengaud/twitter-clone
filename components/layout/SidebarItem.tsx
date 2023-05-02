import useCurrentUser from '@/hooks/useCurrentUser';
import { useLoginModal } from '@/hooks/useLoginModal';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import { BsDot } from 'react-icons/bs';

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ label, href, icon: Icon, onClick, auth, alert }) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const loginModal = useLoginModal();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, auth, currentUser, loginModal]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="h-14 w-14 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden relative flex items-center justify-center p-4 rounded-full cursor-pointer">
        <Icon size={28} color="white" />
        {alert ? <BsDot className="text-sky-500 -top-4 absolute left-0" size={70} /> : null}
      </div>
      <div className="lg:flex hover:bg-slate-300 hover:bg-opacity-10 relative items-center hidden gap-4 p-4 rounded-full cursor-pointer">
        <Icon size={24} color="white" />
        <p className="lg:block hidden text-xl text-white">{label}</p>
        {alert ? <BsDot className="text-sky-500 -top-4 absolute left-0" size={70} /> : null}
      </div>
    </div>
  );
};
