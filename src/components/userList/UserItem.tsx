import { instance } from 'api/instance';
import UserProfilePortal from 'helpers/UserProfilePortal';
import React, { useEffect, useRef, useState } from 'react';
import { smallUser, listUser, user } from 'types/userList';
import UserProfile from './UserProfile';

interface UserItemProps {
  element: listUser;
  smallUser: smallUser[];
  showingUser?: listUser;
  currentuser?: user;
  showUserProfile(targetEmail: string): void;
}

const UserItem = ({
  element,
  smallUser,
  showingUser,
  currentuser,
  showUserProfile,
}: UserItemProps) => {
  const [user] = smallUser.filter((value) => value.email === element.email);
  const [followed, setFollowed] = useState(false);
  const [show, setShow] = useState(false);
  const followRef = useRef<HTMLButtonElement>(null);

  const onClickFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };

    try {
      const response = await instance.post(
        `accounts/follow/${user.id}/`,
        {},
        { headers },
      );
      if (response.status === 200) {
        console.log('follow access');
      }
    } catch (error) {
      console.log(error);
    }

    setFollowed(!followed);
  };

  const onClickShow = () => {
    showUserProfile(element.email);
    setShow(!show);
  };

  useEffect(() => {
    if (currentuser?.followings.some((element) => element.id === user.id)) {
      if (followRef.current) {
        followRef.current.style.backgroundColor = 'light-blue';
        setFollowed(true);
      }
    }
  }, []);

  return (
    <div
      className="shadow-custom-bottom-right border rounded-lg border-none border-black p-1 flex bg-white items-center"
      tabIndex={0}
      role="button"
      onClick={onClickShow}
      onKeyDown={onClickShow}
    >
      <div className="p-3 ">
        <img
          src={`${element.profile_image}`}
          alt="유저이미지"
          className="rounded-full h-11 w-11"
        />
      </div>
      <div className="flex-1 p-3">
        <div>{element.nickname}</div>
        <div className="flex gap-7">
          <div className="flex gap-2">
            <img src="/icons/heart-solid.svg" alt="하트" />
            <span>{element.like_quotes.length}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-extrabold">+</span>
            <span>{element.registered_quotes.length}</span>
          </div>
        </div>
      </div>
      <div className="p-3 mb-2">
        <button
          ref={followRef}
          type="button"
          className={`${!followed ? 'bg-slate-300 p-2 rounded-lg text-black' : 'bg-blue-400 p-2 rounded-lg text-white'} mt-4 text-sm z-60 shadow-md`}
          onClick={onClickFollow}
        >
          {followed ? '팔로잉' : '팔로우'}
        </button>
      </div>
      {show && showingUser && (
        <UserProfilePortal>
          <UserProfile
            showingUser={showingUser}
            followed={followed}
            onClickFollow={onClickFollow}
          />
          <div className="absolute top-0 left-0 h-screen flex w-full">
            <div
              tabIndex={0}
              role="button"
              className="flex bg-black opacity-50 fixed top-0 w-screen h-screen z-40"
              onClick={onClickShow}
              onKeyDown={onClickShow}
            ></div>
          </div>
        </UserProfilePortal>
      )}
    </div>
  );
};

export default UserItem;
