import React from 'react';
import { Sidebar } from './layout/Sidebar';
import { FollowBar } from './layout/FollowBar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-black">
      <div className="xl:px-30 container h-full max-w-6xl mx-auto">
        <div className="grid h-full grid-cols-4">
          <Sidebar />
          <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">{children}</div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};
