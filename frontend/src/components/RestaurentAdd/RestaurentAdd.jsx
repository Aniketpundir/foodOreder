import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { Storecontext } from "../../context/Storecontext";
import axios from "axios";
import "./RestaurentAdd.css";
import { Link, useNavigate } from "react-router-dom";

const RestaurentAdd = ({ setRestLogin }) => {
  const { url, setTokens, login } = useContext(Storecontext);
  const [currState, setCurrState] = useState("Restaurent_Login");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    newUrl += "/api/restro/login";
    const res = await axios.post(newUrl, data);
    if (res.data.success) {
      login(res.data.success);
      setTokens(res.data.token);
      localStorage.setItem("tokens", res.data.token);
      setRestLogin(false);
      navigate("/RestaurantAdminPortal");
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
            <img onClick={() => setRestLogin(false)} src={assets.cross_icon} />
          </div>
          <div className="login-popup-input">
            <div className="email-otps">
              <input
                type="text"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                placeholder="Your restaurent emal"
                required
              />
            </div>
            <input
              type="password"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              placeholder="password"
              required
            />
          </div>
          <button type="submit">Login</button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to term of use & privacy policy.</p>
          </div>
          <div className="Add_restaurent">
            <p>Add Your Restaurent Here.</p>
            <Link to="/AddRestaurent">
              <span onClick={() => setRestLogin(false)}>Add Restaurent</span>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RestaurentAdd;
