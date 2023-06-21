import React, { useState } from 'react';
import './addproduct.css';
import apiRequest from './api/apiRequest';
import { useSelector,useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import checkTokenExpiration from './utils/checkTokenExpiration';
import { setClientData,clearClientData } from './redux/clientReducer';
import { useNavigate } from 'react-router-dom';
import { logout } from './redux/loginReducer';

const AddProduct = ({ setNewProductPage }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [isHidden, setIsHidden] = useState(false);

  const client = useSelector(state=>state.client.data)
  const token = client.accessToken
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoff = () => {
    dispatch(logout())
    dispatch(clearClientData())
    navigate("/login")
  }

  const hide =()=>{
    setNewProductPage(false)
    setIsHidden(!isHidden)
  }


  const handleSubmit = async(event) => {
    event.preventDefault();

    if(checkTokenExpiration(token)){
      logoff()
    }else{

      if(name=== "" || price === "" || description === ""){
        toast.error("You didn't enter all information");
        console.log(client)
      }
      
      else{
        const body = {name:name,price:price, description:description, clientEmail:client.email}
        const response = await apiRequest(token).post("/products/add",body)
  
        if(response?.data){
           //ako je produkt dodan dohvati podatke iz baze  o korisniku i updateaj korisnika u lokalnoj bazi
          if(response.data.isProductSaved){
            //dohvacanje podataka o klijentu s novim proizvodom
            const response = await apiRequest(token).get(`/clients/${client.email}`)
            if(response?.data){
              //updatanje podataka o klijentu na lokalnoj bazi
              if(response.data.isClientFound){
                dispatch(setClientData({data:response.data.client}))
              }
            }
          }
        }
        window.location.reload(true)
      }
    }

   
  };

  return (

    <div className="add-product-container">
      {isHidden? (<></>):
      (
        <>
        
        <h2>Add Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        {}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="wide-input"
          />
        </div>
        <div>
          <label  htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price.toString()}
            onChange={(event) => setPrice(event.target.value)}
            className="wide-input"
          />
        </div>
        <div>
          <label  htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="wide-input"
          ></textarea>
        </div>
        {}
        <button className= "button" type="submit">Add Product</button>
        <button className='button' onClick={hide}>Cancel</button>

      </form>
      <ToastContainer />
        
        </>

        
      )}
      
    </div>
  );
};

export default AddProduct;
