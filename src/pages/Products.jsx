import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { motion } from 'framer-motion'



import styled from 'styled-components';

const Products = () => {
  const { addToCart } = useContext(CartContext);
  const [productList, setProductList] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const presentkortDivRef = useRef(null);

  const handleAddedToCart = (productId) => {
    const productToAdd = productList.find((product) => product._id === productId);
    addToCart(productToAdd);
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };


  const handleAddToCart = (productId) => {
    const productToAdd = productList.find((product) => product._id === productId);
    addToCart(productToAdd);
    handleAddedToCart(productId);

  };


  const handleFetchProducts = async () => {
    const url = 'https://product-api-production-7dbf.up.railway.app/products';
    const response = await fetch(url);
    const productList = await response.json();
    return productList;
  };

  const handleFilterClick = (category) => {
    setActiveFilter(category);
    setSelectedCategory(category);
  };

  const handleSeeMore = () => {
    setVisibleProducts(productList.length);
  };

  const handleSeeLess = () => {
    setVisibleProducts(10);
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
      <section className="landing-page">
        <div className="landing-container">
          <div className="in-pic-container">
            <div className="text-container">
              <motion.div
                className="store-name-container"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              >
                <h1>
                  BR<span className="highlighted-letter">O</span>KEN RECORDS
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              >
                " Rewind, Play, Repeat: Soundtrack Your Life with Vinyl! "
              </motion.p>
            </div>
            <div className="btn-container">
              <div>
                <motion.button className="join-btn"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 1 }}>Subscribe to newsletter</motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StyledProductsdiv id="productdiv">
        <div id="filterbar">
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}

            className={activeFilter === null ? 'sökknapparaktiverad' : 'sökknappar'}
            onClick={() => handleFilterClick(null)}
          >
            Allt
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={activeFilter === 'Rock' ? 'sökknapparaktiverad' : 'sökknappar'}
            onClick={() => handleFilterClick('Rock')}
          >
            Rock
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={activeFilter === 'Jazz' ? 'sökknapparaktiverad' : 'sökknappar'}
            onClick={() => handleFilterClick('Jazz')}
          >
            Jazz
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={activeFilter === 'Hiphop' ? 'sökknapparaktiverad' : 'sökknappar'}
            onClick={() => handleFilterClick('Hiphop')}
          >
            Hiphop
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={activeFilter === 'Pop' ? 'sökknapparaktiverad' : 'sökknappar'}
            onClick={() => handleFilterClick('Pop')}
          >
            Pop
          </motion.button>
        </div>
        <ul id="productUL">
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
                <button onClick={() => handleAddToCart(product._id)} className="buyBtn">
                  Add to cart
                </button>
              </div>
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


        {addedToCart && (
          <NotificationContainer>
            <NotificationText>Your item has been added to the cart!</NotificationText>
          </NotificationContainer>
        )}
      </StyledProductsdiv>

      {/* <div className="reklambanner">
        <h1 id="reklamtext">Använd kod: DNK för 15% rabbat!</h1>
      </div> */}

      <div id="presentkortdiv" ref={presentkortDivRef}>
        <div id="Presentkort">
          <div id="presentkortinnehåll">
            <div id="presentkortkort"></div>

          </div>
          <div id="giftcardtextdiv">

            <p id="giftcardtext">
              Looking for the perfect gift for your loved ones? We're thrilled to announce that you can now purchase gift cards at our stores. Give the gift of music and let them choose their favorite vinyl records, CDs, or other musical treasures. </p>
              <div id="giftcardspan"> </div>
              <div id="locationdiv">Locations: <p className='locations'>Stockholm, sveavägen 3</p> <p className='locations'> Stockholm, Vackra vägen 12</p> <p className='locations'> Göteborg, Varggränd 13</p></div>

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
  align-items: center;
`;

const NotificationContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const NotificationText = styled.p`
  margin: 0;
`;


export default Products;