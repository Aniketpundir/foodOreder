import React, { useState, useContext, useEffect } from "react";
import "./loginPopUp.css";
import { assets } from "../../assets/assets";
import { Storecontext } from "../../context/Storecontext";
import axios from "axios";
import OTPButton from "./otpButton/OtpBitton";

const LoginPopUp = ({ setShowLogin }) => {
  const { url, setForLoginToken, tokens, setToken } = useContext(Storecontext);
  const [currState, setCurrState] = useState("Sign Up");
  const [forToken, setForToken] = useState();

  const [data, setData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setForLoginToken(token);
      setShowLogin(false);
    }
  }, [setForLoginToken, setShowLogin]);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSend = async (e) => {
    e.preventDefault();
    let newUrl = url;
    newUrl += "/api/user/send";
    const res = await axios.post(newUrl, data);
    if (!res.data.success) {
      alert("enter email first");
    } else {
      alert(res.data.message);
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const res = await axios.post(newUrl, data);

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);

    if (res.data.success) {
      setForLoginToken(res.data.token);
      setShowLogin(false);
    } else {
      alert(res.data.message);
    }
  };

  return (
    <>
      <div className="login-popup">
        <form
          onSubmit={onLogin}
          className="login-popup-container"
          data-aos="zoom-in"
        >
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
          </div>
          <div className="login-popup-input">
            {currState === "Login" ? (
              <></>
            ) : (
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your name"
                required
              />
            )}
            <div className="email-otp">
              <input
                type="email"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                placeholder="Your emal"
                required
              />
              {currState === "Login" ? (
                ""
              ) : (
                <button className="otps" type="submit" onClick={onSend}>
                  <OTPButton />
                </button>
              )}
            </div>
            {currState === "Login" ? (
              ""
            ) : (
              <input
                type="text"
                name="otp"
                onChange={onChangeHandler}
                value={data.otp}
                placeholder="Conform Otp"
                required
              />
            )}
            <input
              // onClick={userLocation}
              type="password"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              placeholder="password"
              required
            />
          </div>
          <button type="submit">
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to term of use & privacy policy.</p>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new account?
              <span
                onClick={() => (setCurrState("Sing UP"), setShowLogin(false))}
              >
                Click here
              </span>
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
