import React from 'react';
import logo from './handsshake.png'; 
import './navbar.css'
import { logout } from './redux/loginReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearClientData } from './redux/clientReducer';

    
    
    
  

const NavbarLogoff= () => {

 const navigate = useNavigate()
const dispatch = useDispatch()

const logoff = () => {
    dispatch(logout())
    dispatch(clearClientData())
    navigate("/login")
  }
  return (
    <nav>
      <div className="navbar-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Svaštara</h1>
        
         <button id="button" onClick={logoff}>Logoff</button>
      </div>
     
    </nav>
  );
};

export default NavbarLogoff;
