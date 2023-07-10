import React, { useContext } from 'react';
import Cart from '../components/Cart';
import { CartContext } from '../components/CartContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {SiKlarna} from 'react-icons/si';
import {AiFillCreditCard} from 'react-icons/ai';
import {SiPaypal} from 'react-icons/si'
import styled from 'styled-components';

const Checkout = () => {
  const { cart, setCart } = useContext(CartContext); // Get cart and setCart from CartContext
  const [updatecart, setupdateCart] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [rabbatkod, setrabbatkod] = useState("");
  const [showImage, setShowImage] = useState(false);

 

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowImage(true);
  
  };
  return (
    <Styledcheckoutdiv>
    <h1 id="checkouth1">Checkout</h1>
    <div id="formcontainer">
      {showImage ? (
        <img id="orderbild" src="../imgs/order.png" alt="Thank you" />
      ) : (
        <>
          <Cart cart={cart} updatecart={updatecart} setupdateCart={setupdateCart} />
          <div className="checkout-form-container">
            <form id="checkoutform" onSubmit={handleSubmit}>
              <div className="form-section">
                <h1 style={{ marginTop: "50px", marginBottom: '50px' }}>Shipping Information</h1>
                <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  id="name"
                  className="inputcheckout"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="email">Email Address:</label>
                <input
                  className="inputcheckout"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="address">Address:</label>
                <input
                  className="inputcheckout"
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <label htmlFor="city">City:</label>
                <input
                  className="inputcheckout"
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
               
                
                <label htmlFor="zip">Zip Code:</label>
                <input
                  className="inputcheckout"
                  type="text"
                  id="zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                style={{ width: "100px" }}
                id="checkoutknapp"
                type="submit"
              >
                Order
              </motion.button>
              <p style={{ color: "grey" }}>or</p>
              <motion.div
                whileInView={{ scale: 0.9 }}
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: '50px'
                }}
              >
                <SiKlarna size="25" color="pink" />
                <AiFillCreditCard size="25" />
                <SiPaypal size="25" />
              </motion.div >
            </form>
          </div>
        </>
      )}
    </div>
  </Styledcheckoutdiv>
)
};

const Styledcheckoutdiv = styled.div`
background-image: url(https://images.unsplash.com/photo-1633012350330-a957eeb38487?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80);
background-repeat: no-repeat;
background-size: cover;
min-height: 75vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction:  column;
width: 100%;
@media (max-width: 992px) {

  
  
 


}


`;

export default Checkout;
