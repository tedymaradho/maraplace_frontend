import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setCurrentUser } from '../redux/userSlice';

const SignUp = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const fullnameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const resSignup = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/signup`,
        {
          email: emailRef.current?.value,
          full_name: fullnameRef.current?.value,
          password: passwordRef.current?.value,
          address: addressRef.current?.value,
          phone: phoneRef.current?.value,
        }
      );

      if (resSignup.data.status === 'success') {
        await dispatch(
          setCurrentUser({
            email: resSignup.data.data.user.email,
            token: resSignup.data.token,
          })
        );

        await localStorage.setItem(
          'userData',
          JSON.stringify({
            email: resSignup.data.data.user.email,
            token: resSignup.data.token,
          })
        );

        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup">
      <div className="signup__wrapper">
        <div className="signup__logo">
          <img
            className="signup__logo--img"
            src="https://firebasestorage.googleapis.com/v0/b/maradho-8c79e.appspot.com/o/logo%2FLOGO%20MARADHO.webp?alt=media&token=1e4f07ad-c9c8-4ac3-99f1-13bc6320947e"
            alt="logo"
          />
        </div>
        <h1 className="signup__title">
          Marashop <span>| SignUp</span>
        </h1>
        <form className="signup__form">
          <input
            className="signup__form--fullname"
            type="text"
            name="fullname"
            placeholder="Full Name"
            ref={fullnameRef}
          />
          <input
            className="signup__form--email"
            type="text"
            name="email"
            placeholder="Email"
            ref={emailRef}
          />
          <input
            className="signup__form--password"
            type="password"
            name="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <input
            className="signup__form--address"
            type="text"
            name="address"
            placeholder="Address"
            ref={addressRef}
          />
          <input
            className="signup__form--phone"
            type="text"
            name="phone"
            placeholder="Phone Number"
            ref={phoneRef}
          />
          <button
            className="signup__button signup__button--signup"
            type="submit"
            onClick={signupHandler}
          >
            SignUp
          </button>
          <Link to="/login" className="signup__button signup__button--login">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
