import React from 'react';
import logo from './handsshake.png'; 
import './navbar.css'

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Svaštara</h1>
      </div>
    </nav>
  );
};

export default Navbar;
