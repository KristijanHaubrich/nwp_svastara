import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import apiRequest from './api/apiRequest';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import checkTokenExpiration from './utils/checkTokenExpiration';
import { logout } from './redux/loginReducer';
import { useDispatch } from 'react-redux';
import { clearClientData } from './redux/clientReducer';
import Products from './Products';
import AddProduct from './AddProduct';
import './products.css'


const ClientProfilePage =  () => {
  const [products, setProducts] = useState([]);

  const client = useSelector(state=>state.client.data)
  const token = client.accessToken
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const getProducts = async() => {
    const response= await apiRequest(token).get(`/products`)
    setProducts(response.data.products)
    console.log(response.data.products)
  };

  const logoff = () => {
    dispatch(logout())
    dispatch(clearClientData())
    navigate("/login")
  }

  useEffect(() => {
    getProducts();

    const setData = async () => {
      if(checkTokenExpiration(token)){
        logoff()
      }else{
        const response = await apiRequest(token).get("/products")

      }
    }

    setData()
  
  },[]);

  return (
    

    <div>
      <h2>Your products:</h2>
      {products.length === 0 ? (
        <h1>You don't have any products</h1>
      ) : (
        <div className="product-card-container">
        {products.map((product) => (
          <Products key={product.id} product={product} />
          
        ))}
       
      </div>
      )}
        
 <AddProduct/>
    </div>
    
  );
};

export default ClientProfilePage;
