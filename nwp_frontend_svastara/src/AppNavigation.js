import Login from "./Login"
import Register from "./Register"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import { useSelector,useDispatch } from "react-redux";
import ClientProfilePage from "./ClientProfilePage";
import NavbarLogoff from "./NavbarLogoff";


const AppNavigation = () => {
    const isLoggedIn = useSelector(state=>state.login.isLoggedIn)

    if(isLoggedIn){
      return(
        <Router>
        <NavbarLogoff /> 
        <Routes>
          <Route path="/" element={<ClientProfilePage/>}/>
          <Route path="/login" element={ <Login/>} />    
          <Route path="/register" element={ <Register/>} />
          <Route path="/clientPage" element={ <ClientProfilePage/>} />    
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
          <Route path="/clientPage" element={ <ClientProfilePage/>} />     
        </Routes>
      </Router> 
      )
    }
   
}

export default AppNavigation;