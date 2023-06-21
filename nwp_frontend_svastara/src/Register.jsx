import React, { useState } from 'react';
import './register.css'
import { Link } from 'react-router-dom';
import apiRequest from './api/apiRequest';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reppassword, setRepPassword] = useState('');
  const navigate = useNavigate()
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRepPasswordChange = (e) => {
    setRepPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password === "" || reppassword === "" || name === "" || email === ""){
      toast.error("You didn't enter all information");
    }else{
      if(password === reppassword){
        const response = await apiRequest("").get(`/public/checkClientEmail/${email}`)
        if(response?.data){
          if(response.data.validate){
            //baci error korisnik vec postoji
            toast.error("User with that email is already registered");
          }else{
            const body = {name: name,password: password,email: email}
            const response = await apiRequest("").post("/public/registerClient",body)
            if(response?.data){
              if(response.data.validate){
                toast.success("Korisnik je uspješno registriran")
                navigate("/login")
                //korisnik uspjesno registriran
                
              }else{
                //izbaci error korisnik nije uspjesno registriran
                toast.error("Error happened, user not registered!");
              }
            }
          } 
        }else{
          //izbaci error server error
          toast.error("Server error happened,try again!");
        }
      }else{
        //izbaci error lozinka se ne podudara s ponovljenom
        toast.error("Passwords not matching!");
  
      }
    }
    
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
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
        <label>
          Repeat password:
          <input type="password" value={reppassword} onChange={handleRepPasswordChange} />
        </label>
        <br />
        <button type="submit">Register</button>

 <div className="register-link">
        Already have an account? <Link to="/login">Login here</Link>.
      </div>
        
      </form>

      <ToastContainer />

     
    </div>

    
  );
};

export default RegisterPage;
