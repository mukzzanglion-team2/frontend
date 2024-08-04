import React, { useState } from 'react';
import PasswordStoreButton from './PasswordStoreButton';

const EditPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [checkNewPassword, setCheckNewPassword] = useState('');

  const [currentPasswordErr, setCurrentPasswordErr] = useState(true);
  const [newPasswordErr, setNewPasswordErr] = useState(true);
  const [checkNewPasswordErr, setCheckNewPasswordErr] = useState(true);

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const isValidPassword = (password: string) => {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);
  };

  const toggleShowPassword = (passwordNumber: number): void => {
    if (passwordNumber === 1) {
      setShowPassword1(!showPassword1);
    } else if (passwordNumber === 2) {
      setShowPassword2(!showPassword2);
    }
    setShowPassword3(!showPassword3);
  };

  const onChangeCurrentPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const onChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const onChangeCheckNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckNewPassword(e.target.value);
  };

  return (
    <form className="p-3 flex flex-col gap-3 bg-white h-screen items-center">
      <div className="my-4 text-xl">
        <h2 className="text-xl w-[335px]">회원정보 수정/비밀번호</h2>
      </div>
      <section>
        <span className="text-sm mr-3">현재 비밀번호</span>
        <div className="gap-2 my-2 w-[335px] flex-1 mx-auto rounded-lg border border-gray-300  h-[50px] flex items-center justify-between px-3 bg-white">
          <input
            value={currentPassword}
            onChange={onChangeCurrentPassword}
            type={showPassword1 ? 'text' : 'password'}
            className="outline-none flex-1"
            name="currentPassword"
            placeholder="비밀번호를 입력하세요"
          />
          <button type="button">
            <img
              onClick={() => toggleShowPassword(1)}
              src={
                !showPassword1 ? '/icons/eyeClosed.svg' : '/icons/eyeOpend.svg'
              }
              alt="눈"
              onKeyDown={() => toggleShowPassword(1)}
            />
          </button>
        </div>
      </section>
      <section>
        <span className="text-sm mr-3">새로운 비밀번호</span>
        <div className="gap-2 my-2 w-[335px] flex-1 mx-auto rounded-lg border border-gray-300  h-[50px] flex items-center justify-between px-3 bg-white">
          <input
            value={NewPassword}
            onChange={onChangeNewPassword}
            type={showPassword2 ? 'text' : 'password'}
            className="outline-none flex-1"
            name="password"
            placeholder="비밀번호를 입력하세요"
          />
          <button type="button">
            <img
              onClick={() => toggleShowPassword(2)}
              src={
                !showPassword2 ? '/icons/eyeClosed.svg' : '/icons/eyeOpend.svg'
              }
              alt="눈"
              onKeyDown={() => toggleShowPassword(2)}
            />
          </button>
        </div>
      </section>
      <section>
        <span className="text-sm mr-3">새로운 비밀번호 확인</span>
        <div className="gap-2 my-2 w-[335px] flex-1 mx-auto rounded-lg border border-gray-300  h-[50px] flex items-center justify-between px-3 bg-white">
          <input
            value={checkNewPassword}
            onChange={onChangeCheckNewPassword}
            type={showPassword3 ? 'text' : 'password'}
            className="outline-none flex-1"
            name="password"
            placeholder="비밀번호를 입력하세요"
          />
          <button type="button">
            <img
              onClick={() => toggleShowPassword(3)}
              src={
                !showPassword3 ? '/icons/eyeClosed.svg' : '/icons/eyeOpend.svg'
              }
              alt="눈"
              onKeyDown={() => toggleShowPassword(3)}
            />
          </button>
        </div>
      </section>
      <PasswordStoreButton
        currentPassword={currentPassword}
        NewPassword={NewPassword}
        checkNewPassword={checkNewPassword}
      />
    </form>
  );
};

export default EditPassword;