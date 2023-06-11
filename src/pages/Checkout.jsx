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

 

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };
  return (
    <Styledcheckoutdiv>
      <h1 style={{margin: "40px" ,color:"white", fontSize: "60px"}}>Checkout</h1>
        <div id="formcontainer"> 
          <Cart cart={cart} updatecart={updatecart} setupdateCart={setupdateCart} />
            <div className="checkout-form-container">
              <form  id="checkoutform"onSubmit={handleSubmit}>
              <div className="form-section">
                <h1 style={{marginBottom: "50px"}}>
                Shipping Information
                </h1>
              <label htmlFor="name">Full Name:</label>
                <input
                  type="text"
                  id="name"className='inputcheckout'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              <label htmlFor="email">Email Address:</label>
                <input
                className='inputcheckout'
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              <label htmlFor="address">Address:</label>
                <input
                className='inputcheckout'
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              <label htmlFor="city">City:</label>
                <input
                className='inputcheckout'
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              <label htmlFor="state">State:</label>
                <input
                className='inputcheckout'
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              <label htmlFor="zip">Zip Code:</label>
                <input
                className='inputcheckout'
                  type="text"
                  id="zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                />
           </div>
            <motion.button 
              whileTap={{ scale: 0.9 }} 
              style={{width: "100px"}}  
              id="checkoutknapp" 
              type="submit">
                Order
            </motion.button>
        <p style={{color:"grey"}}>or</p>
            <motion.div whileInView={{scale:0.9}} style={{
              display:"flex",
              gap: "10px"}}> 
                <SiKlarna size="25"color='pink'/> 
                <AiFillCreditCard size="25"/>
                <SiPaypal  size="25"/>          
            </motion.div>
          </form>
        </div>
      </div>
    </Styledcheckoutdiv>
  )
}
const Styledcheckoutdiv = styled.button`
background-image: url(https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80);
background-repeat: no-repeat;
background-size: cover;
min-height: 75vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction:  column;
width: 1540px;
`;

export default Checkout;
