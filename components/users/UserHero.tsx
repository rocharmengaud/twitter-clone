import React from 'react';
import Image from 'next/image';
import useUser from '@/hooks/useUser';
import { Avatar } from '../Avatar';

interface UserHeroProps {
  userId: string;
}

export const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);
  console.log(fetchedUser);

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover Image"
            style={{
              objectFit: 'cover',
            }}
          />
        )}
        <div className="-bottom-16 left-4 absolute">
          <Avatar userId={userId} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};
