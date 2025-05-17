import React from "react";
import { assets } from "../../assets/assets";
import "./Footer.css";
import { NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="footer">
        <div className="footer-content">
          <div className="footer-content-left">
            <h2 className="footer-logo">ZayKaxpress</h2>
            <p>
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry. Lorem ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrembled of type and scrambled it to make a type
              specimen book.
            </p>
            <div className="social-logo">
              <NavLink>
                <img src={assets.facebook_icon} alt="Facebook" />
              </NavLink>
              <NavLink>
                <img src={assets.twitter_icon} alt="Twitter" />
              </NavLink>
              <NavLink>
                <img src={assets.linkedin_icon} alt="LinkedIn" />
              </NavLink>
            </div>
          </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <NavLink to="/">
                <li>Home</li>
              </NavLink>
              <li navigate="/about">About</li>
              <li>Mobile No.</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+1-212-4560-7890</li>
              <li>content@gamil.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="copyright">
          Copyright 2024 &copy; ZayKaxpress - All Right Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
