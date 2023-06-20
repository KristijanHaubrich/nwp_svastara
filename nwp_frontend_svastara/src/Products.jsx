import React from "react";
import "./products.css";
import apiRequest from "./api/apiRequest";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setClientData } from "./redux/clientReducer";
import { useDispatch } from "react-redux";
import checkTokenExpiration from "./utils/checkTokenExpiration";
import { useNavigate } from "react-router-dom";
import { logout } from "./redux/loginReducer";
import { clearClientData } from "./redux/clientReducer";
import { useState } from "react";

const Products = ({ product, showButtons, showEmail }) => {
  const [updatePressed, setUpdatePressed] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const toggleEditMode = () => {
    setUpdatePressed(!updatePressed);
    setEditedProduct({ ...product }); // Reset the edited product to the current product data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };
  const client = useSelector((state) => state.client.data);
  const token = client.accessToken;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoff = () => {
    dispatch(logout())
    dispatch(clearClientData())
    navigate("/login")
  }

  const deleteProduct = async () => {

    try {
      if(checkTokenExpiration(token)){
        logoff()
      }else{
        const response = await apiRequest(token).delete(`products/${product.name}`);
        if(response){
          if(response.data.validate){
            //dohvacanje podataka o klijentu s novim podacima
            const response = await apiRequest(token).get(`/clients/${client.email}`)
            if(response?.data){
              //updatanje podataka o klijentu na lokalnoj bazi
              if(response.data.isClientFound){
                dispatch(setClientData({data:response.data.client}))
                window.location.reload(true)
              }
            }
          }
        }
      }
    
    } catch (error) {

      toast.error("Error happened!");
      console.error("Error deleting product:", error);
    }
  }
  const updateProduct = async () => {
    toggleEditMode();
  };

  const saveChanges = async () => {
    console.log(editedProduct)
    const body = {name: editedProduct.name,price: editedProduct.price,description: editedProduct.description}
    console.log(body)
    try {
      const response = await apiRequest(token).patch(`/products/update`, body);
      console.log(response.data)
      if (response.data.isProductUpdated) {
        toggleEditMode();
        toast.success("Product updated successfully!");
      }
    } catch (error) {
      toast.error("Error occurred while updating the product!");
      console.error("Error updating product:", error);
    }
    
  toggleEditMode();
  };

  const cancelChanges = async() =>{
    toggleEditMode();
  }

  return (
    <div className="product-card">

{updatePressed ? (
        <div>
         <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedProduct.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={editedProduct.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
             <button className="button" onClick={saveChanges}>Save</button>
          <button className="button" onClick={cancelChanges}>Cancel</button>
          </div>
         
        </div>
      ) : (
        <div>
        <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      {showEmail ? (<p>Email: {product.clientEmail}</p>):(<></>)}
{showButtons? (
<div>
      <button className="button" onClick={deleteProduct}>
        Delete product
      </button>
      <button className="button" onClick={updateProduct}>
        Update product
      </button>

      </div>

):(<></>)}
      
      
      <ToastContainer />
        </div>
      )
      
      
}
    </div>
  );
};

export default Products;
