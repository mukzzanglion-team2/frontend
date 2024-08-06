import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { info, err } from 'types/register';
import RegisterForm from './RegisterForm';

const Register = () => {
  // console.log('Register');
  const [register, setRegister] = useState<info>({
    email: '',
    password: '',
    checkPassword: '',
    nickname: '',
  });

  const [error, setError] = useState<err>({
    emailErr: false,
    passwordErr: false,
    checkPasswordErr: false,
    nicknameErr: false,
  });

  const emailMountRef = useRef(false);
  const passwordMountRef = useRef(false);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const isValidPassword = (password: string) => {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);
  };

  const updateError = useCallback(
    (name: string, value: string) => {
      let { emailErr, passwordErr, checkPasswordErr, nicknameErr } = error;

      // console.log('Register-updateError');
      if (name === 'email') {
        emailErr = isValidEmail(value);
      } else if (name === 'password') {
        passwordErr = isValidPassword(value);
        if (!passwordErr) checkPasswordErr = false;
      } else if (name === 'checkPassword') {
        checkPasswordErr =
          value === register.password && passwordErr && value !== '';
      } else if (name === 'nickname') {
        nicknameErr = value.length >= 3;
      }

      // 불필요한 리렌더링 방지용
      setError((prevError) => {
        if (
          prevError.emailErr !== emailErr ||
          prevError.passwordErr !== passwordErr ||
          prevError.checkPasswordErr !== checkPasswordErr ||
          prevError.nicknameErr !== nicknameErr
        ) {
          return { emailErr, passwordErr, checkPasswordErr, nicknameErr };
        }
        return prevError;
      });
    },
    [error, register.password],
  );

  useEffect(() => {
    if (!emailMountRef.current) {
      // console.log('Register-Email-Mount');
      emailMountRef.current = !emailMountRef.current;
      return;
    }
    console.log('Register-Email-Update');
    // console.log('useEffect checking(email) Called');
    updateError('email', register.email);
  }, [register.email]);

  useEffect(() => {
    if (!passwordMountRef.current) {
      // console.log('Register-Password-Mount');
      passwordMountRef.current = !passwordMountRef.current;
      return;
    }
    console.log('Register-Password-Update');
    // console.log('useEffect checking(password, checkPassword) Called');
    updateError('password', register.password);
    updateError('checkPassword', register.checkPassword);
  }, [register.password, register.checkPassword]);

  const onChangeRegister = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRegister({ ...register, [e.target.name]: e.target.value });
      updateError(e.target.name, e.target.value);
    },
    [register, updateError],
  );

  return (
    <RegisterForm
      register={register}
      error={error}
      onChangeRegister={onChangeRegister}
    ></RegisterForm>
  );
};

export default memo(Register);
