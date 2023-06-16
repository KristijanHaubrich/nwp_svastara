import React, { useState } from 'react';
import './login.css'
import { Link } from 'react-router-dom';
import apiRequest from './api/apiRequest';
import { useNavigate } from 'react-router-dom';
import checkTokenExpiration from './utils/checkTokenExpiration';
import { useDispatch } from 'react-redux';
import { setClientData } from './redux/clientReducer';
import { login } from './redux/loginReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigation = useNavigate()

 
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  };

  const handleSubmit =  async (e) => {
    e.preventDefault()

    // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b21vLm1hZGphckBnbWFpbC5jb20iLCJpYXQiOjE2ODYyNTI1NDEsImV4cCI6MTY4NzExNjU0MX0.Dvps1W7uuNI3AFdEieNJzQvEmTC_HQaGhT9_Yu2jj44"
    // const isTokenExpired = checkTokenExpiration(token)
    
    // if(isTokenExpired){
    //   navigation("/login")
    // }else{
    //   const response= await apiRequest(token).get(`/clients`)
    //   console.log(response.data)
    // }

    const body = {password:password,email:email}
    const response = await apiRequest("").post("/public/authenticate",body)
   
    if(response?.data){
      if(response.data.isClientFound && response.data.isPasswordCorrect){
        //ulogiraj korisnika
        dispatch(login())
        console.log(response.data.client)
        dispatch(setClientData({data:response.data.client}))
        navigation("/clientPage")
      }else if(!response.data.isClientFound){
        toast.error("User is not registered, please register!");
      }else if(!response.data.isPasswordCorrect){
        toast.error("Wrong password!");
      }
    }else{
      //izbaci upozorenje za problem s konekcijom na bazu
      toast.error("Server error!");
    }
    
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
       
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Login</button>

 <div className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>.
      </div>
        
      </form>
      <ToastContainer />

     
    </div>
  );
};

export default LoginPage;


