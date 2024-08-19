import { instance } from 'api/instance';
import React, { useEffect, useState } from 'react';
import { user, smallUser, listUser } from 'types/userList';
import UserItem from './UserItem';

const UserList = () => {
  const [smallUser, setSmallUser] = useState<smallUser[]>([]);
  const [user, setUser] = useState<listUser[]>([]);
  const [showingUser, setShowingUser] = useState<listUser>();
  const [currentuser, setCurrentUser] = useState<user>();

  const getUsers = async () => {
    try {
      const response = await instance.get('accounts/list/');

      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showUserProfile = (targetEmail: string) => {
    if (user) {
      const [showingUser] = user.filter(
        (element) => element.email === targetEmail,
      );
      setShowingUser(showingUser);
    }
  };

  const fetchProfileData = async () => {
    try {
      const userInfoResponse = await instance.get('accounts/profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(`accessToken`)}`,
        },
      });
      if (userInfoResponse.status === 200) {
        setCurrentUser(userInfoResponse.data);
      }
    } catch (error) {
      console.error('데이터를 불러오는 데 실패했습니다', error);
    }
  };

  const getSmallUsers = async () => {
    try {
      const response = await instance.get('accounts/register/');

      if (response.status === 200) {
        setSmallUser(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUsers();
    getSmallUsers();
    fetchProfileData();
  }, []);

  const fetchedData = () => {
    if (user && currentuser) {
      return user.filter((element) => element.email !== currentuser.email);
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-7 mt-[100px] w-full px-[40px] pb-[100px]">
      {fetchedData()?.map((element) => (
        <UserItem
          key={element.email}
          element={element}
          smallUser={smallUser}
          showingUser={showingUser}
          currentuser={currentuser}
          showUserProfile={showUserProfile}
        />
      ))}
    </div>
  );
};

export default UserList;
