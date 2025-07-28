import React from 'react';
import './styles/Navbar.css'; // Link to external CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/static/ico_1.png" alt="App Icon" className="logo" />
        <span className="app-name">Stroke Risk App</span>
      </div>
      <div className="navbar-right">
        <a href="/">Home</a>
        <a href="predict">Predict</a>
        <a href="support">Support</a>
      </div>
    </nav>
  );
};

export default Navbar;
