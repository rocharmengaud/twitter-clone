import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { BiArrowBack } from 'react-icons/bi';

interface HeaderProps {
  label: string;
  showBackArrow?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();

  // useCallback() is useful for optimizing the performance of functional
  // components that use callbacks by memoizing the callback function and preventing unnecessary re-renders
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && <BiArrowBack onClick={handleBack} size={20} color="white" className="hover:opacity-70 transition cursor-pointer" />}
        <h1 className="text-xl font-semibold text-white">{label}</h1>
      </div>
    </div>
  );
};
