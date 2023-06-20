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
import './products.css';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const client = useSelector(state => state.client.data);
  const token = client.accessToken;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoff = () => {
    dispatch(logout());
    dispatch(clearClientData());
    navigate('/login');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if(checkTokenExpiration(token)){
        logoff()
        return
      }
      try {
        const response = await apiRequest(token).get(`/products`);
        console.log(response.data.products);
        setProducts(response.data.products);
      } catch (error) {
        if (checkTokenExpiration(error)) {
          logoff();
        }
      }
    };

    fetchProducts();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const productNameMatches = product.name.toLowerCase().includes(searchValue.toLowerCase());
    const priceInRange =
      maxPrice !== '' ? parseFloat(product.price) <= parseFloat(maxPrice) : true;
    return productNameMatches && priceInRange && !client.products.some(cpItem => cpItem.id === product.id);
  });

  return (
    <div>
      <div className="searches">
        <div className="search-bar">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchInputChange}
            placeholder="Search other user's products"
            style={{
              border: '2px solid #16592d',
              fontWeight: 'bold',
            }}
          />
        </div>

        <div className="price-filter">
          <label htmlFor="max-price" style={{
              color: 'white'
            }}>Max Price:</label>
          <input
            type="range"
            id="max-price"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
          <span style={{
              color: 'white'
            }}>{maxPrice}</span>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <h2 >No product matched the filter</h2>
      ) : (
        <div className="product-card-container">
          {filteredProducts.map((product) => (
            <Products key={product.id} product={product} showButtons={false} showEmail={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
