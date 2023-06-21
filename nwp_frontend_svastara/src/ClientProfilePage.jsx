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
  const [newProduct, setNewProductPage] = useState(false);

  const client = useSelector(state=>state.client.data)
  
  const toogleview = ()=>{
    setNewProductPage(!newProduct)
  }

  useEffect(() => {

    const setData =  () => {
      setProducts(client.products)
    }

    setData()
  
  },[]);

  return (
    

    <div className='titles'>
      <h2>Your products:</h2>
      {products.length === 0 ? (
        <h1>You don't have any products</h1>
      ) : (
        <div className="product-card-container">
        {products.map((product) => (
          <Products key={product.id} product={product}  showButtons={true} />
          
        ))}
       
      </div>
      )}
    
    {newProduct ? (
     <AddProduct setNewProductPage={setNewProductPage}/>
    ) : (

      <div id="parentnew"><button className='newButton' onClick={toogleview}>Add new product</button></div>
 
    )}
 
    </div>
    
  );
};

export default ClientProfilePage;
