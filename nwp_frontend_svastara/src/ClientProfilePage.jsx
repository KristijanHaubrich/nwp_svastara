import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import apiRequest from './api/apiRequest';
import { useEffect } from 'react';


const ClientProfilePage = () => {
  const isLoggedIn = useSelector(state=>state.login.isLoggedIn)
  const client = useSelector(state=>state.client.data)
  const token = client.accessToken

  useEffect(() => {
    const setData = async () => {
      const response = apiRequest("").get(`/public/${client.email}`)
    }
    setData()
  },[]);

  return (
    <h2>Profile Page</h2>
  );
};

export default ClientProfilePage;
