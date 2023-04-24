import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ label, href, icon: Icon, onClick }) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }
    if (href) {
      router.push(href);
    }
  }, [router, onClick, href]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="h-14 w-14 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden relative flex items-center justify-center p-4 rounded-full cursor-pointer">
        <Icon size={28} color="white" />
      </div>
      <div className="lg:flex hover:bg-slate-300 hover:bg-opacity-10 relative items-center hidden gap-4 p-4 rounded-full cursor-pointer">
        <Icon size={24} color="white" />
      </div>
      <p className="lg:block hidden text-xl text-white">{label}</p>
    </div>
  );
};
