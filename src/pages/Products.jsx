import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import uuid4 from "uuid4";
import styled from 'styled-components';

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [productList, setProductList] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [allProductsVisible, setAllProductsVisible] = useState(false);

  const handleAddToCart = (productId) => {
    const productToAdd = productList.find(product => product._id === productId);
    addToCart(productToAdd);
  };

  const handleFetchProducts = async (category) => {
    const url = category
      ? `https://product-api-production-7dbf.up.railway.app/products?category=${category}`
      : `https://product-api-production-7dbf.up.railway.app/products`;

    const response = await fetch(url);
    const productList = await response.json();
    setProductList(productList);
  };

  const handleSeeMore = () => {
    setVisibleProducts(productList.length);
    setAllProductsVisible(true);
  };

  useEffect(() => {
    handleFetchProducts(); // Fetch all products initially
  }, []);

  const handleFilterClick = (category) => {
    handleFetchProducts(category);
  };

  return (
    <div id="productsdiv">
      <div id="filterbar">
        <input type='text' placeholder='Search' />
        <button className='sökknappar'>Sök</button>
        <h5>Filter:</h5>
        <button className='sökknappar'  onClick={() => handleFilterClick('Rock')}>Rock</button>
        <button className='sökknappar' onClick={() => handleFilterClick('Jazz')}>Jazz</button>
        <button className='sökknappar' onClick={() => handleFilterClick('Hiphop')}>Hiphop</button>
        <button className='sökknappar' onClick={() => handleFilterClick('Pop')}>Pop</button>
      </div>

      <StyledProductsdiv>
        <ul className='productUL'>
          {productList.slice(0, visibleProducts).map((product) => (
            <div className="productcard" key={product._id}>
              <Link to={"/Product/" + product._id}>
                <div className='productListItem' style={{ backgroundImage: `url(${product.image})` }}>
                  {/* Product card content */}
                </div>
              </Link>
              <div className='productsinfotext'>
                <h5 className='albumTitle'>{product.title}</h5>
                <h4 className='albumInfo'>{product.description}</h4>
                <h4 className='albumInfo'>Release year: {product.releaseyear}</h4>
                <p className='priceTag'>{product.price}:-</p>
              </div>
              <Button onClick={() => handleAddToCart(product._id)} className='cartBtn'>Add to cart</Button>
            </div>
          ))}
        </ul>
        {!allProductsVisible && (
        <button onClick={handleSeeMore} className='seemorebutton'>See More</button>
      )}

      </StyledProductsdiv>
    
     
    </div>
  );
};

const StyledProductsdiv = styled.div`
  margin: 10px;
  border: 4px solid black;
  min-height: 535px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const Button = styled.button`
  color: rgb(241, 198, 6);;
  border: 2px solid white;
  background: black;
  border-radius: 5px;
  height: 40px;
  width: 50%;

  &:hover {
    background: rgb(241, 198, 6);
    color: black;
    border: 2px solid rgb(241, 198, 6);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export default Products;
