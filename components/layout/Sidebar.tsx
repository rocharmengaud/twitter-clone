import { BsBellFill, BsHouseFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { SidebarLogo } from './SidebarLogo';
import { SidebarItem } from './SidebarItem';
import { BiLogOut } from 'react-icons/bi';
import { SidebarTweetButton } from './SidebarTweetButton';

export const Sidebar = () => {
  const items = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill,
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBellFill,
    },
    {
      label: 'Profile',
      href: '/users/123',
      icon: FaUser,
    },
  ];

  return (
    <div className="md:pr-6 h-full col-span-1 pr-4">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem key={item.href} href={item.href} label={item.label} icon={item.icon} />
          ))}
          <SidebarItem onClick={() => {}} icon={BiLogOut} label="Logout" />
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};
