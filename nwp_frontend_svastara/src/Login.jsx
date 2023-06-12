import React, { useState } from 'react';
import './login.css'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login,logout} from './redux/loginReducer';
import apiRequest from './api/apiRequest';
import { useNavigate } from 'react-router-dom';
import checkTokenExpiration from './utils/checkTokenExpiration';

const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  //const navigation = useNavigate()

 
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
    
    const response = await apiRequest("").post("/public/authenticate",{password:password,email:email})


    if(response?.data){
      if(response.data.isClientFound && response.data.isPasswordCorrect){
        //ulogiraj korisnika
      }else if(!response.data.isClientFound){
        //izbaci upozorenje za nepostojećeg korisnika
      }else if(!response.data.isPasswordCorrect){
        //izbaci upozorenje za krivu lozinku
      }
    }else{
      //izbaci upozorenje za problem s konekcijom na bazu
    }

    console.log(response.data)
    
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

     
    </div>
  );
};

export default LoginPage;


