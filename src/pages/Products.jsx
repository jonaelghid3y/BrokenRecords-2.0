import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

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
                <button className='join-btn'>Subscribe to newsletter</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="filterbar">
        <div className='search'>
          <input className= "search-bar" type="text" placeholder="Search" />
          <button className='svg-searchicon'>
            <FiSearch />
          </button>
        </div>
        
        <button className="sökknappar" onClick={() => handleFilterClick(null)}>All</button>
        <button className="sökknappar" onClick={() => handleFilterClick('Rock')}>Rock</button>
        <button className="sökknappar" onClick={() => handleFilterClick('Jazz')}>Jazz</button>
        <button className="sökknappar" onClick={() => handleFilterClick('Hiphop')}>Hiphop</button>
        <button className="sökknappar" onClick={() => handleFilterClick('Pop')}>Pop</button>
      </div>

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
              <button onClick={() => handleAddToCart(product._id)} className="cartBtn">
                Add to cart
              </button>
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
            <h1 style={{ width: '600px', color: 'white' }}>Gift the Soundtrack: Let Music Be Their Personal Symphony</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

const StyledProductsdiv = styled.div`
  padding: 20px;
  width: 100%;
  min-height: 535px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

export default Products;
