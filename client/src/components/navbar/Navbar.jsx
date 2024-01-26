import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { DarkModeContext } from "../../context/createContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ToastSuccess } from "../../components/sweetAlert/sweetAlert";
import "./navbar.scss";

const Navbar = () => {
  const [showNavbarMobile, setShowNavbarMobile] = useState(false);
  const { darkMode, currentMode, currentUser, logout } =
    useContext(DarkModeContext);
  const mobileNavbarRef = useRef();

  // console.log(currentUser);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      ToastSuccess.fire({
        icon: "success",
        title: "Log out successfully",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (mobileNavbarRef.current && mobileNavbarRef.current === event.target) {
        console.log("halo");
        setShowNavbarMobile(!showNavbarMobile);
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [showNavbarMobile]);

  return (
    <>
      <nav className={`navbar ${currentMode && "dark"}`}>
        <div className="listItem left">
          <Link
            to="/"
            className="title"
            style={{ color: currentMode ? "white" : "teal" }}>
            SuBlog
          </Link>
          {currentMode ? (
            <LightModeIcon
              fontSize="large"
              sx={{ color: "white", cursor: "pointer" }}
              onClick={darkMode}
            />
          ) : (
            <DarkModeIcon
              fontSize="large"
              sx={{ color: "teal", cursor: "pointer" }}
              onClick={darkMode}
            />
          )}
        </div>
        <div className="listItem right">
          <div className="categories">
            <Link to="/?category=programming">Programming</Link>
            <Link to="/?category=design">Design</Link>
            <Link to="/?category=technology">Technology</Link>
          </div>
          <div className="dashboard">
            <Button
              variant="outlined"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              startIcon={<ExpandMoreIcon />}
              onClick={handleClick}>
              Categories
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}>
              <MenuItem onClick={handleClose}>
                <Link to="/?category=programming">Programming</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/?category=design">Design</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/?category=technology">Technology</Link>
              </MenuItem>
            </Menu>
          </div>
          <Link to={"/write"} className="write">
            <ModeEditIcon fontSize="small" />
            Write
          </Link>
          <div className="profile" style={{ display: "none" }}>
            <p className="name">John Doe</p>
            <Link to={"/profile/?name=johndoe"} className="img">
              <img
                src="https://images.pexels.com/photos/14158744/pexels-photo-14158744.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
                alt="wkwk"
              />
            </Link>
          </div>

          {currentUser && (
            <div className="userInfo">
              <p>{currentUser.username}</p>
              <button onClick={handleLogout} className="auth">
                Logout
              </button>
            </div>
          )}

          <div style={{ display: currentUser ? "none" : "flex", gap: "8px" }}>
            <Link to={"/login"} className="auth">
              Login
            </Link>
            <Link to={"/register"} className="auth">
              Register
            </Link>
          </div>
          <MenuIcon
            fontSize="large"
            className="mobileToggle"
            onClick={() => setShowNavbarMobile(!showNavbarMobile)}
          />
        </div>
      </nav>

      {/* MOBILE NAVBAR */}
      <div
        ref={mobileNavbarRef}
        className={`mobileNavbar ${currentMode && "dark"}`}
        style={{
          bottom: showNavbarMobile ? "0px" : "-100%",
          display: showNavbarMobile ? "block" : "none",
        }}>
        <div className="listItem">
          {currentUser && (
            <div className="button-auth">
              <p>{currentUser.username}</p>
              <button onClick={handleLogout} className="auth">
                Logout
              </button>
            </div>
          )}
          <div
            className="button-auth"
            style={{ display: currentUser ? "none" : "flex" }}>
            <Link to={"/login"} className="auth">
              <LoginIcon />
              Login
            </Link>
            <Link to={"/register"} className="auth">
              <LoginIcon />
              Register
            </Link>
          </div>
          <div className="categories">
            <Link to="/?category=programming" className="cat">
              Programming
            </Link>
            <Link to="/?category=design" className="cat">
              Design
            </Link>
            <Link to="/?category=technology" className="cat">
              Technology
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
