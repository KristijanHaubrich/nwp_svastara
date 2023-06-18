import React, { useState } from 'react';
import './addproduct.css';
import apiRequest from './api/apiRequest';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const client = useSelector(state=>state.client.data)
  const token = client.accessToken

  const handleSubmit = async(event) => {
    event.preventDefault();


    if(name=== "" || price === "" || description === "" || clientEmail === ""){
      toast.error("You didn't enter all information");
      console.log(client)
    }
    else if(client.email!== clientEmail)
    {
      toast.error("You have entered wrong email!");
    }
    
    else{
      const body = {name:name,price:price, description:description, clientEmail:clientEmail}
      const response = await apiRequest(token).post("/products/add",body)
      window.location.reload(true)
      
      console.log(response.data)
    }
  };

  return (
    <div className="add-product-container">
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
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price.toString()}
            onChange={(event) => setPrice(event.target.value)}
            className="wide-input"
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="wide-input"
          ></textarea>
        </div>
        <div>
          <label htmlFor="clientEmail">Client Email:</label>
          <input
            type="email"
            id="clientEmail"
            value={clientEmail}
            onChange={(event) => setClientEmail(event.target.value)}
            className="wide-input"
          />
        </div>
        {}
        <button type="submit">Add Product</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;