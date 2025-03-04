import React from "react";
import "./Footer.css";
import LinkIcon from "../../images/LinkIcon.svg";
import LoginIcon from "../../images/login.png";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Copyright for all the links belong to
        {" "}
        <a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer">
          GeeksforGeeks
        </a>
        {" "}
        <img src={LinkIcon} alt="GeeksforGeeks Logo" className="footer-logo" />
      </p>
      <p>
        Copyright for this website belongs to CodeCardS
        {" "}
        <img src={LoginIcon} alt="CodeCardS Logo" className="footer-logo" />
      </p>
    </footer>
  );
};

export default Footer;
