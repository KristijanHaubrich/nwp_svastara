import React from 'react';
import logo from './handsshake.png'; 
import './navbar.css'
import { logout } from './redux/loginReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearClientData } from './redux/clientReducer';
import man from './5087579.png'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import checkTokenExpiration from './utils/checkTokenExpiration';

    
    
    
  

const NavbarLogoff= () => {

  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const client = useSelector(state => state.client.data);
  const token = client.accessToken;


const changeOptions=()=>{
  setShowOptions(!showOptions)
}

const changePassword=async()=>{
  navigate("/changePass")
}

const logoff = () => {
  setTimeout(function() {
    dispatch(clearClientData())
  }, 1000);
    dispatch(logout())
    navigate("/login")
    
    
  }


  const openSearch = () => {
    navigate("/allproducts")

  }
  const openProfile =()=>{
    navigate("/clientPage")
  }
  return (
    <nav>
      <div className="navbar-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Svaštara</h1>
<div id="buttons">
  <button id="button" onClick={openProfile}>Your profile</button>
  <button id="button" onClick={openSearch}>Search all</button>
        

  <img onClick={changeOptions} src={man} alt="Logo" className="man" />

  {showOptions ? (
    <>
   < button className="buttonblack" onClick={logoff}>Logoff</button>
    <button className="buttonblack" onClick={changePassword}>Change pwd</button>
    </>
  
  ): (<></>)}
         
</div>
        
      </div>
     
    </nav>
  );
};

export default NavbarLogoff;
