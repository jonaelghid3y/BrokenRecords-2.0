import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import styled from 'styled-components';

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [productList, setProductList] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track the selected category

  const handleAddToCart = (productId) => {
    const productToAdd = productList.find((product) => product._id === productId);
    addToCart(productToAdd);
  };

  const handleFetchProducts = async () => {
    const url = 'https://product-api-production-7dbf.up.railway.app/products';
    const response = await fetch(url);
    const productList = await response.json();
    return productList;
  };

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSeeMore = () => {
    setVisibleProducts(productList.length);
  };

  const handleSeeLess = () => {
    setVisibleProducts(8);
  };

  useEffect(() => {
    handleFetchProducts()
      .then((products) => {
        if (selectedCategory) {
          const filteredProducts = products.filter((product) => product.category === selectedCategory);
          setProductList(filteredProducts);
        } else {
          setProductList(products);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [selectedCategory]);

  return (
    <div id="productsdiv">
      <div id="filterbar">
        <input type="text" placeholder="Search" />
        <button className="sökknappar">Sök</button>
        <h5>Filter:</h5>
        <button className="sökknappar" onClick={() => handleFilterClick(null)}>
          Allt
        </button>
        <button className="sökknappar" onClick={() => handleFilterClick('Rock')}>
          Rock
        </button>
        <button className="sökknappar" onClick={() => handleFilterClick('Jazz')}>
          Jazz
        </button>
        <button className="sökknappar" onClick={() => handleFilterClick('Hiphop')}>
          Hiphop
        </button>
        <button className="sökknappar" onClick={() => handleFilterClick('Pop')}>
          Pop
        </button>
      </div>
      <section className='landing-page'> 
      <div className='landing-container'>
        <div className='in-pic-container'> 
          <div className='text-container'>
            <div className='store-name-conatiner'>
              <h1>BR<span className='highlighted-letter'>O</span>KEN RECORDS</h1>
            </div>
            <p>"Rewind, Play, Repeat: Soundtrack Your Life with Vinyl!"</p>
          </div>
          <div className='btn-container'>
            <div>
              <button className='join-btn'>Join us</button>
            </div>
            <div>
              <button className='login-btn custom-login-btn'>Login</button>
            </div>
          </div>
        </div>
      </div>
      </section>

      <StyledProductsdiv>
        <ul className="productUL">
          {productList.slice(0, visibleProducts).map((product) => (
            <div className="productcard" key={product._id}>
              <Link to={`/Product/${product._id}`}>
                <div className="productListItem" style={{ backgroundImage: `url(${product.image})` }}>
                  {/* Product card content */}
                </div>
              </Link>
              <div className="productsinfotext">
                <h5 className="albumTitle">{product.title}</h5>
                <h4 className="albumInfo">{product.description}</h4>
                <h4 className="albumInfo">Release year: {product.releaseyear}</h4>
                <p className="priceTag">{product.price}:-</p>
              </div>
              <Button onClick={() => handleAddToCart(product._id)} className="cartBtn">
                Add to cart
              </Button>
            </div>
          ))}
        </ul>
        {productList.length > 8 && (
          <div>
            {visibleProducts < productList.length ? (
              <button onClick={handleSeeMore} className="seemorebutton">
                See More
              </button>
            ) : (
              <button onClick={handleSeeLess} className="seemorebutton">
                See Less
              </button>
            )}
          </div>
        )}
      </StyledProductsdiv>
      <div className="reklambanner">

        <h1> SUMMERDEAL use code: SUN för 15% discount!</h1>
      </div>
      <div id="presentkortdiv">
      
      <div id="Presentkort">

              <div id="presentkortinnehåll">
              <div id="presentkortkort"></div>
              <h1 style={{width: '600px',color: 'white'}}>Gift the Soundtrack: Let Music Be Their Personal Symphony</h1>
              </div>
      </div>
     
     
      </div>

      
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
  color: rgb(241, 198, 6);
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