import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import apiRequest from './api/apiRequest';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import checkTokenExpiration from './utils/checkTokenExpiration';
import { logout } from './redux/loginReducer';
import { useDispatch } from 'react-redux';
import { clearClientData } from './redux/clientReducer';


const ClientProfilePage = () => {
  const isLoggedIn = useSelector(state=>state.login.isLoggedIn)
  const client = useSelector(state=>state.client.data)
  const token = client.accessToken
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const setData = async () => {
      if(checkTokenExpiration(token)){
        dispatch(logout())
        dispatch(clearClientData())
        navigate("/login")
      }else{
        const response = await apiRequest(token).get(`/products`)
        console.log(response.data)
      }



    }
    setData()
  },[]);

  return (
    <h2>Profile Page</h2>
  );
};

export default ClientProfilePage;
