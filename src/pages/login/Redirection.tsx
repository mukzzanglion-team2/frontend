import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirection = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const res = await axios({
          method: 'get',
          url: `https://pebblequote.site/accounts/kakao/callback/?code=${code}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', // json형태로 데이터를 보내겠다는 뜻
          },
        });
        // 백엔드에서 완료 후 우리 사이트 전용 토큰을 넘겨주는 게 성공했다면
        console.log(res);
        // 계속 사용할 정보들(예: 이름 등)은 localStorage에 저장해두자
        localStorage.setItem('accessToken', res.data.access);
        // 로그인이 성공하면 이동할 페이지
        navigate('/');
      } catch (error) {
        console.error('로그인 실패:', error);
        // 오류 처리 (예: 오류 페이지로 이동)
        navigate('/login');
      } finally {
        if (localStorage.getItem('accessToken')) {
          navigate('/');
        }
      }
    };
    kakaoLogin();
  }, [code, navigate]);

  return <div>Redirecting...</div>;
};

export default Redirection;
