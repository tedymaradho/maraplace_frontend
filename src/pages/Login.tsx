import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setCurrentUser } from '../redux/userSlice';

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [errMsg, setErrMsg] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (emailRef.current?.value) {
      if (passRef.current?.value) {
        try {
          const resLogin = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
            {
              email: emailRef.current?.value,
              password: passRef.current?.value,
            }
          );

          if (resLogin.data.status === 'success') {
            setErrMsg('');

            await dispatch(
              setCurrentUser({
                email: resLogin.data.data.email,
                token: resLogin.data.data.token,
              })
            );

            await localStorage.setItem(
              'userData',
              JSON.stringify({
                email: resLogin.data.data.email,
                token: resLogin.data.data.token,
              })
            );

            navigate('/');
          }
        } catch (error) {
          setErrMsg('Login failed, email or password is wrong');
          console.error(error);
        }
      } else {
        setErrMsg('Pasword cannot be empty');
      }
    } else {
      setErrMsg('Email cannot be empty');
    }
  };

  return (
    <div className="login">
      <div className="login__wrapper">
        <div className="login__logo">
          <img
            className="login__logo--img"
            src="https://firebasestorage.googleapis.com/v0/b/maradho-8c79e.appspot.com/o/logo%2FLOGO%20MARADHO.webp?alt=media&token=1e4f07ad-c9c8-4ac3-99f1-13bc6320947e"
            alt="logo"
          />
        </div>
        <h1 className="login__title">
          Marashop <span>| Login</span>
        </h1>
        <form className="login__form">
          <input
            className="login__form--email"
            type="email"
            name="email"
            placeholder="Email"
            ref={emailRef}
          />
          <input
            className="login__form--password"
            type="password"
            name="password"
            placeholder="Password"
            ref={passRef}
          />
          {errMsg && <span className="error__message">{errMsg}</span>}
          <button
            onClick={loginHandler}
            className="login__button login__button--login"
            type="submit"
          >
            Login
          </button>
          <Link to="/signup" className="login__button login__button--signup">
            SignUp
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
