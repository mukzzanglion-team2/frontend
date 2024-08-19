import { instance } from 'api/instance';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { err } from 'types/register';

interface LoginButtonProps {
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  emailInput: string;
  passwordInput: string;
  submitted: boolean;
  error: err;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  emailRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
}

const LoginButton = ({
  setSuccess,
  emailInput,
  passwordInput,
  submitted,
  error,
  setSubmitted,
  emailRef,
  passwordRef,
}: LoginButtonProps) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const errRef = useRef<HTMLDivElement>(null);

  const onClickKakaoLogin = () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    // 배포 전에 URI 수정해서 .enV에 옮기기
    const REDIRECT_URI = 'https://hackathonpebble.vercel.app/auth/callback/'; // 프론트엔드의 Redirect URI
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = link;
  };

  const onClickNormalLogin = async () => {
    setSubmitted(true);
    const isErrorFree = Object.values(error).every(
      (element) => element === true,
    );

    if (emailInput === '' && passwordInput === '') {
      setErrorMessage('로그인 정보를 입력해주세요');
      return;
    }

    if (!isErrorFree) {
      setErrorMessage('회원 정보가 없습니다. 입력 정보를 확인해주세요.');
      return;
    }

    const dataToSend = {
      email: emailInput,
      password: passwordInput,
    };

    try {
      const response = await instance.post('accounts/login/', dataToSend);
      console.log(response.status);
      if (response.status === 200) {
        setSuccess(true);
        const accessToken = response.data.access;
        console.log(response);
        window.localStorage.setItem('accessToken', accessToken);
        navigate('/');
      }
    } catch (err) {
      console.log('ERROR OCCURED');
      setErrorMessage('회원 정보가 없습니다. 입력 정보를 확인해주세요.');
    }
  };
  // ========================================================================

  useEffect(() => {
    if (submitted) {
      emailRef.current?.style.setProperty(
        'border',
        error.emailErr ? '' : '1px solid red',
      );
      passwordRef.current?.style.setProperty(
        'border',
        error.passwordErr ? '' : '1px solid red',
      );
    }
  }, [submitted, error]);
  // ==========================================================

  return (
    <section>
      {errorMessage && (
        <div ref={errRef} className="text-center text-sm px-3 text-red-500">
          {errorMessage}
        </div>
      )}
      <div className="mt-[20px] text-center flex flex-col gap-6 items-center">
        <button
          className="rounded-lg bg-black w-[335px] h-[45.5px] shadow-md text-white"
          type="button"
          onClick={onClickNormalLogin}
        >
          로그인
        </button>

        <button
          className="flex gap-4 justify-center items-center rounded-lg w-[335px] h-[45px] shadow-md bg-kakao-yellow"
          type="button"
          onClick={onClickKakaoLogin}
        >
          <img className="" src="icons/kakao_shape.png" alt="카카오 로그인" />
          <span>카카오톡으로 1초만에 시작하기</span>
        </button>
        <div>
          <span>회원이 아니신가요? </span>
          <Link className="underline" to="/register">
            회원가입하기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginButton;
