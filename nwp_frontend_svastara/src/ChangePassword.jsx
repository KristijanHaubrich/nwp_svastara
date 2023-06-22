import { useDispatch, useSelector } from "react-redux";
import apiRequest from "./api/apiRequest";
import checkTokenExpiration from "./utils/checkTokenExpiration";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { logout } from "./redux/loginReducer";
import { clearClientData } from "./redux/clientReducer";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const client = useSelector((state) => state.client.data)
    const token = client.accessToken
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOldPass = (e) => {
        setOldPassword(e.target.value);
    };

    const handleNewPass = (e) => {
        setNewPassword(e.target.value);
    };

    const handleRepeatPass = (e) => {
        setRepeatPassword(e.target.value);
    };

    const changePass = async(e) => {
        e.preventDefault();
        if(checkTokenExpiration(token)){
            dispatch(logout())
            dispatch(clearClientData())
            navigate("/login")
            return
        }

        if(oldPassword != "" && newPassword != ""){
            if(repeatPassword != newPassword){
                toast.error("Repeated password doesn't match new password")
            }else{
                const body = {oldPassword: oldPassword, newPassword: newPassword, email: client.email}
                const response = await apiRequest(token).patch("/clients/changePass",body)
                if(response?.data){
                    if(response.data.isOldPasswordMatch){
                        if(response.data.isNewPasswordSaved){
                            //lozinka uspjesno spremljena
                            toast.success("Password is successfully changed!")
                            navigate("/clientPage")
                        }
                    }else{
                        //niste unijeli dobru staru lozinku
                        toast.error("Old password is not correct")
                    }
                }
            }
            
        }else(
            toast.error("You didn't input all data")
        )
    }

    return(
        <div>
        <h2>Change Password</h2>
        <form onSubmit={changePass}>
          <label>
            Old Password:
            <input type="password" value={oldPassword} onChange={handleOldPass} />
          </label>
          <br />
          <label>
            New Password:
            <input type="password" value={newPassword} onChange={handleNewPass} />
          </label>
          <br />
          <label>
            Repeat Password:
            <input type="password" value={repeatPassword} onChange={handleRepeatPass} />
          </label>
          <br />
          <button type="submit">Change Password</button>
          </form>
          <ToastContainer />
          </div>
    )
}

export default ChangePassword