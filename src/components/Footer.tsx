import React from "react";
import { ImLinkedin, ImYoutube } from "react-icons/im";
import { FaTwitterSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div>
          <p className="footer-header font4">Shop Demo</p>
          <p className="footer-text font2">
          Artworks that will tickle your imagination, The complete art gallery that you'll ever find. The art gallery that you will fall in love with.
          </p>
        </div>

        <div>
          <p className="footer-header font4">Location</p>
          <p className="footer-text font2">Poland</p>
          <p className="footer-text font2">Turkey</p>
          <p className="footer-text font2">UK</p>
        </div>

        <div>
          <p className="footer-header font4">Services</p>
          <p className="footer-text font2">Gallery</p>
          <p className="footer-text font2">Videos</p>
          <p className="footer-text font2">UI/UX Design</p>
          <p className="footer-text font2">Photgraphy</p>
        </div>

        <div>
          <p className="footer-header font4">Site map</p>
          <p className="footer-text font2">Home</p>
          <p className="footer-text font2">Contact</p>
          <p className="footer-text font2">Cart</p>
        </div>
        <div>
          <p className="footer-header font4">Contact</p>
          <p className="footer-text font2">email@gmail.com</p>
          <p className="footer-text font2">+1232 36778 270</p>
        </div>
      </div>
      <div className="footer-bottom font2">
        <p>@2021 All rights reserved</p>
        <p>
          <ImLinkedin />
          <ImYoutube />
          <FaTwitterSquare />
          <AiFillInstagram />
        </p>
      </div>
    </div>
  );
};

export default Footer;
