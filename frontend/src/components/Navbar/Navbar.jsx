import React, {
  useCallback,
  useContext,
  useEffect,
  Navigator,
  useState,
} from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { Storecontext } from "../../context/Storecontext";
import axios from "axios";

const Navbar = ({ setShowLogin, setRestLogin }) => {
  const [district, setDistrict] = useState("");
  const {
    getTotalCartAmount,
    forLoginToken,
    setForLoginToken,
    tokens,
    setTokens,
    logout1,
  } = useContext(Storecontext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setForLoginToken("");
    navigate("/");
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          dist(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    const dist = async (latitude, longitude) => {
      let apiEndPoint = "https://api.opencagedata.com/geocode/v1/json";
      let apikey = "416911d3a90940a6ba7ba4f7aaaa402e";

      const query = `${latitude},${longitude}`;
      const apiUrl = `${apiEndPoint}?key=${apikey}&q=${query}&pretty=1`;

      try {
        const res = await axios(apiUrl);
        const data = res.data;
        const dist = data.results[0].components.state_district;
        setDistrict(dist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  }, [setDistrict]);

  // console.log(district);

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img
            data-aos="fade-right"
            src={assets.logo}
            alt="logo"
            className="logo"
          />
        </Link>
        <h3>&#128205;{district}</h3>
        <ul className="navbar-menu">
          {!forLoginToken ? (
            !tokens ? (
              <button onClick={() => setRestLogin(true)}>
                Restaurent Portal
              </button>
            ) : (
              /* <p>You are enter in portal</p> */
              <button onClick={logout1}>Log Out</button>
            )
          ) : (
            console.log("")
          )}
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} />
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>

          {!tokens ? (
            !forLoginToken ? (
              <button onClick={() => setShowLogin(true)}>
                Log in / sign in
              </button>
            ) : (
              <div className="navbar-profile">
                <img src={assets.profile_icon} />
                <ul className="nav-profile-dropdown">
                  <li>
                    <img src={assets.bag_icon} alt="" />
                    <p>Order</p>
                  </li>
                  <hr />
                  <li>
                    <img onClick={logout} src={assets.logout_icon} alt="" />
                    <p>Log Out</p>
                  </li>
                </ul>
              </div>
            )
          ) : (
            console.log("")
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
