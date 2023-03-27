import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { loginAxios } from '../axios/authAxios';

const Login = () => {
  const [uname, setUname] = useState('');
  const [pass, setPass] = useState('');

  const unameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUname(e.target.value);
  };

  const passChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const loginHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (uname) {
      if (pass) {
        loginAxios(uname, pass);
      } else {
        throw new Error('Pasword tidak boleh kosong');
      }
    } else {
      throw new Error('Username tidak boleh kosong');
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
            className="login__form--username"
            type="text"
            name="username"
            placeholder="Username / Email"
            value={uname}
            onChange={unameChangeHandler}
          />
          <input
            className="login__form--password"
            type="password"
            name="password"
            placeholder="Password"
            value={pass}
            onChange={passChangeHandler}
          />
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
