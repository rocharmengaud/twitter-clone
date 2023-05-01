import useCurrentUser from '@/hooks/useCurrentUser';
import { useLoginModal } from '@/hooks/useLoginModal';
import { formatDistanceToNowStrict } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import { Avatar } from '../Avatar';
import { AiOutlineHeart, AiOutlineMessage, AiFillHeart } from 'react-icons/ai';
import useLike from '@/hooks/useLike';

interface PostItemProps {
  // data = posts
  data: Record<string, any>;
  userId?: string;
}

// data is our post
export const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  // console.log(data);
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (event: any) => {
      // Overwriting the global onClick of the parents
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div onClick={goToPost} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p onClick={goToUser} className="hover:underline font-semibold text-white cursor-pointer">
              {data.user.name}
            </p>
            <span onClick={goToUser} className="text-neutral-500 hover:underline md:block hidden cursor-pointer">
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt} ago</span>
          </div>
          <div className="mt-1 text-white">{data.body}</div>
          <div className="flex flex-row items-center gap-10 mt-3">
            <div className="text-neutral-500 hover:text-sky-500 flex flex-row items-center gap-2 transition cursor-pointer">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div onClick={onLike} className="text-neutral-500 hover:text-red-500 flex flex-row items-center gap-2 transition cursor-pointer">
              <LikeIcon size={20} color={hasLiked ? 'red' : ''} />
              <p>{data.likedIds.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
