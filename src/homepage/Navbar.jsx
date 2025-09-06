import React, { useState } from "react";
import "./styles/Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../sign/firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // redirect to login after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/static/ico_1.png" alt="App Icon" className="logo" />
        <span className="app-name">Stroke Risk App</span>
      </div>

      {/* Burger menu for small screens */}
      <div
        className="burger"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Normal desktop links */}
      <div className="navbar-right">
        <span onClick={() => navigate("/home")} className="nav-link">Home</span>
        <span onClick={() => navigate("/predict")} className="nav-link">Predict</span>
        <span onClick={() => navigate("/support")} className="nav-link">Support</span>
        <span onClick={() => navigate("/contacts")} className="nav-link">Contacts</span>
        <span onClick={() => navigate("/dashboard")} className="nav-link">Dashboard</span>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="mobile-menu">
          <span onClick={() => navigate("/home")} className="nav-link">Home</span>
          <span onClick={() => navigate("/predict")} className="nav-link">Predict</span>
          <span onClick={() => navigate("/support")} className="nav-link">Support</span>
          <span onClick={() => navigate("/contacts")} className="nav-link">Contacts</span>
          <span onClick={() => navigate("/dashboard")} className="nav-link">Dashboard</span>
          <span onClick={handleLogout} className="nav-link">Logout</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
