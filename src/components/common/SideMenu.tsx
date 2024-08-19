import { instance } from 'api/instance';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SideMenuProps {
  onClickMenu(): void;
}

const MENUITEMS = [
  { moveTo: '/', icon: 'icons/house-solid.svg', label: '홈' },
  { moveTo: '/my', icon: 'icons/profileMenu-click.png', label: '마이페이지' },
  {
    moveTo: '/editProfile',
    icon: 'icons/edit-click.png',
    label: '프로필 편집',
  },
  { moveTo: '/quoteList', icon: 'icons/follow-click.png', label: '둘러보기' },
];

const SideMenu = ({ onClickMenu }: SideMenuProps) => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    onGetUserNickname();
  }, []);

  const onGetUserNickname = async () => {
    try {
      const response = await instance.get('accounts/profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        setNickname(response.data.nickname);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickLogout = () => {
    window.localStorage.removeItem('accessToken');
    navigate('/login');
    onClickMenu();
  };

  const onClickMove = ({ moveTo }: { moveTo: string }) => {
    navigate(moveTo);
    onClickMenu();
  };

  return (
    <section className="flex w-full flex-col px-3 h-screen relative bg-white">
      <button
        type="button"
        className="w-full h-[30px] mt-[15px] text-xl flex"
        onClick={onClickMenu}
      >
        <img
          src="/icons/x-solid.svg"
          alt="X버튼"
          className="ml-[4px] mt-[5px] w-5 h-5"
        />
      </button>
      <div className="w-full flex h-[70px] items-center justify-between">
        <div className="flex gap-2">
          <span className="text-xl font-semibold border-b-2 border-gray-400">
            {nickname}
          </span>
          <span>님</span>
        </div>
        <div className="flex items-center">
          <img
            src="/icons/pebble.png"
            alt="조약돌"
            className="w-[50px] h-[50px]"
          />
          <span>3</span>
        </div>
      </div>
      <div>
        <ul className="flex flex-col gap-5 mt-[30px]">
          {MENUITEMS.map((item) => (
            <li
              key={Math.random()}
              className="border-b-[1px] border-slate-200 hover:border-black"
            >
              <div
                tabIndex={0}
                role="button"
                onClick={() => onClickMove({ moveTo: item.moveTo })}
                onKeyDown={() => onClickMove({ moveTo: item.moveTo })}
                className="flex items-center gap-3 my-3"
              >
                <img src={item.icon} alt={item.label} className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full h-[70px]  absolute bottom-0 left-0 px-4 flex justify-end gap-3 items-center border-t-[1px] border-slate-400">
        <h2 className="font-semibold">로그아웃</h2>
        <button
          type="button"
          className="flex justify-center"
          onClick={onClickLogout}
        >
          <img src="/icons/logout.svg" alt="로그아웃버튼" className="w-7 h-7" />
        </button>
      </div>
    </section>
  );
};

export default SideMenu;
