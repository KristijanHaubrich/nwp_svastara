import React from "react";
import "./products.css";
import apiRequest from "./api/apiRequest";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setClientData } from "./redux/clientReducer";
import { useDispatch } from "react-redux";

const Products = ({ product }) => {
  const client = useSelector((state) => state.client.data);
  const token = client.accessToken;
  const dispatch = useDispatch()
  const deleteProduct = async () => {
    try {
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
    } catch (error) {

      toast.error("Error happened!");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
      <button className="button" onClick={deleteProduct}>
        Delete product
      </button>
      <ToastContainer />
    </div>
  );
};

export default Products;
