import React, { useContext, useState, useEffect } from "react";
import "./RestaurentAddF.css";
import OTPButton from "../../loginPopUp/otpButton/OtpBitton";
import axios from "axios";
import { Storecontext } from "../../../context/Storecontext";

const RestaurentAddF = () => {
  const { url, setToken } = useContext(Storecontext);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
    phone: "",
    locality: "",
    district: "",
    state: "",
    pin_code: "",
    lati: "",
    longi: "",
  });

  const location = () => {
    alert(
      "Click here to give access to your current location click on the input field. (अपने वर्तमान स्थान तक पहुंच देने के लिए यहां क्लिक करें इनपुट फ़ील्ड पर क्लिक करें।)"
    );
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setData((prevData) => ({
            ...prevData,
            lati: latitude,
            longi: longitude,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const register = async (e) => {
    e.preventDefault();
    let newUrl = url;
    newUrl += "/api/restro/register";

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("otp", data.otp);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("locality", data.locality);
    formData.append("district", data.district);
    formData.append("state", data.state);
    formData.append("pin_code", data.pin_code);
    formData.append("lati", data.lati);
    formData.append("longi", data.longi);
    formData.append("image", image);

    const res = await axios.post(newUrl, formData);
    console.log(formData);
    if (res.data.success) {
      setData({
        name: "",
        email: "",
        otp: "",
        password: "",
        phone: "",
        locality: "",
        district: "",
        state: "",
        pin_code: "",
        lati: "",
        longi: "",
        // GSTIN: "",
      });
      setImage(false);
      // setToken(res.data.success)
    } else {
      alert(res.data.message);
    }
  };

  const onSend = async (e) => {
    e.preventDefault();
    let newUrl = url;
    newUrl += "/api/user/send";
    const res = await axios.post(newUrl, data);
    console.log(newUrl);
    if (!res.data.success) {
      alert("enter email first");
    } else {
      alert(res.data.message);
    }
  };

  return (
    <>
      <div className="Add-restaurent-container">
        <h1>Add Your Restaurent Details</h1>
        <div className="form-start">
          <form onSubmit={register}>
            <div className="form-input">
              <input
                className="document"
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
              <input
                placeholder="Restaurent Name"
                name="name"
                type="text"
                value={data.name}
                onChange={onChangeHandler}
                required
              />
              {/* <input
                placeholder="Restaurent GSTIN Number"
                name="name"
                type="text"
                value={data.GSTIN}
                onChange={onChangeHandler}
                required
              /> */}
              <input
                placeholder="Mobile Number"
                name="phone"
                type="number"
                value={data.phone}
                onChange={onChangeHandler}
                required
              />
              <div className="Email-otp">
                <input
                  placeholder="Email Id"
                  name="email"
                  type="text"
                  value={data.email}
                  onChange={onChangeHandler}
                  required
                />
                <button type="submit" onClick={onSend}>
                  <OTPButton />
                </button>
              </div>
              <input
                name="otp"
                type="text"
                value={data.otp}
                onChange={onChangeHandler}
                placeholder="Conform OTP"
                required
              />
              <input
                placeholder="Password"
                name="password"
                type="password"
                value={data.password}
                onChange={onChangeHandler}
                required
              />
              <input
                placeholder="Locality"
                name="locality"
                type="text"
                value={data.locality}
                onChange={onChangeHandler}
                required
              />
              <input
                placeholder="District"
                name="district"
                type="text"
                value={data.district}
                onChange={onChangeHandler}
                required
              />
              <input
                placeholder="State"
                name="state"
                type="text"
                value={data.state}
                onChange={onChangeHandler}
                required
              />
              <input
                placeholder="Pin Code (Zip Code)"
                name="pin_code"
                type="text"
                value={data.pin_code}
                onChange={onChangeHandler}
                required
              />
              <div className="location">
                <input
                  placeholder="latitude"
                  name="lati"
                  type="text"
                  value={data.lati}
                  onChange={onChangeHandler}
                  required
                  readOnly
                />
                <input
                  placeholder="longitude"
                  name="longi"
                  type="text"
                  value={data.longi}
                  onChange={onChangeHandler}
                  readOnly
                  required
                />
                <p onClick={location}>
                  Click here to your Current Location (latitude & longitude)
                </p>
                <span>Make sure you are in your restaurent Location ?</span>
              </div>
              <button type="submit" className="submitButton">
                Submit Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RestaurentAddF;
