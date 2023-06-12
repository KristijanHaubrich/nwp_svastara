import Login from "./Login"
import Register from "./Register"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import { useSelector } from "react-redux";

const AppNavigation = () => {
    const isLoggedIn = useSelector(state=>state.login.isLoggedIn)
    
    if(isLoggedIn){
      return(
        <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={ <Login/>} />    
          <Route path="/register" element={ <Register/>} />  
        </Routes>
      </Router> 
      )
    }else{
      return(
        <Router>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element={ <Login/>} />    
          <Route path="/register" element={ <Register/>} />  
        </Routes>
      </Router> 
      )
    }
   
}

export default AppNavigation;