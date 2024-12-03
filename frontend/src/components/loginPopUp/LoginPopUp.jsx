import React, { useState } from "react";
import "./loginPopUp.css";
import { assets } from "../../assets/assets";

const LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  return (
    <>
      <div className="login-popup">
        <form className="login-popup-container" data-aos="zoom-in">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
          </div>
          <div className="login-popup-input">
            {currState === "Login" ? (
              <></>
            ) : (
              <input type="text" placeholder="Your name" required />
            )}
            <div className="email-otp">
              <input type="email" placeholder="Your emal" required />
              <button className="otp">Get OTP</button>
            </div>
            <input type="password" placeholder="password" required />
          </div>
          <button>
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to term of use & privacy policy.</p>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new account?
              <span onClick={() => setCurrState("Sing UP")}>Click here</span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopUp;
