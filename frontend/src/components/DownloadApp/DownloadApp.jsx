import React from "react";
import "./DownloadApp.css";
import { assets } from "../../assets/assets";

const DownloadApp = () => {
  return (
    <>
      <div className="download-app">
        <div>
          <h1>
            For Better Experience Download <br /> ZayKaxpress App
          </h1>
        </div>
        <div className="download-app-img">
          <img src={assets.play_store} alt="play store" />
          <img src={assets.app_store} alt="App store" />
        </div>
      </div>
    </>
  );
};

export default DownloadApp;
