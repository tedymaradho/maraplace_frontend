import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const fullnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const signupHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
    } catch (error) {}
    console.log(usernameRef.current?.value);
    console.log(fullnameRef.current?.value);
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
            className="signup__form--username"
            type="text"
            name="username"
            placeholder="Username"
            ref={usernameRef}
          />
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
