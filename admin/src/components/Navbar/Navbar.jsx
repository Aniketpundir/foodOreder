import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <img src={assets.logo} className="logo" alt="logo" />
        <img src={assets.profile_image} className="profile" alt="profile-img" />
      </div>
      <hr />
    </>
  );
};

export default Navbar;