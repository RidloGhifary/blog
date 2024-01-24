import React, { useContext } from "react";
import "./footer.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/createContext";

const Footer = () => {
  const { currentMode } = useContext(DarkModeContext);

  return (
    <footer className={`${currentMode && "dark"}`}>
      <div className="footer-content">
        <h1>SuBlog</h1>
        <p>
          Sublog is a dynamic and innovative blog platform designed to empower
          users to share their unique and sublime thoughts with the world.
          Whether you're an aspiring writer, a seasoned blogger, or someone with
          a passion for expressing ideas, Sublog provides a creative space where
          your voice can resonate.
        </p>
        <ul className="socials">
          <li>
            <Link to={"#"}>
              <FacebookIcon />
            </Link>
          </li>
          <li>
            <Link to={"#"}>
              <InstagramIcon />
            </Link>
          </li>
          <li>
            <Link to={"#"}>
              <XIcon />
            </Link>
          </li>
          <li>
            <Link to={"#"}>
              <WhatsAppIcon />
            </Link>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>
          copyright &copy; <Link>SuBlog</Link>{" "}
        </p>
        <div className="footer-menu">
          <ul className="f-menu">
            <li>
              <Link to={`/?category=programming`}>Programming</Link>
            </li>
            <li>
              <Link to={`/?category=design`}>Design</Link>
            </li>
            <li>
              <Link to={`/?category=technology`}>Technology</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
