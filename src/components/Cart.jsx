import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CartContext } from '../components/CartContext';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AiFillMinusCircle } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';



const Cart = ({ cart }) => {
  const { setCart, addProduct, reduceProduct, removeProduct } = useContext(CartContext);

  const handleAddProduct = (productId) => {
    addProduct(productId);
  };

  const handlereduceProduct = (productId) => {
    reduceProduct(productId);
  };

  const handleremoveProduct = (productId)=>{
    removeProduct(productId);
  }

  const emptyCart = () => {
    setCart([]);
  }

  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  const updatedCartWithoutZeroQuantity = cart.filter((product) => product.quantity > 0);

  useEffect(() => {
    setCart(updatedCartWithoutZeroQuantity);
  }, []);

  if (cart.length === 0) {
    return (
      <div className="cart__empty">
        
        <h1 style={{borderBottom: "1px solid black", marginTop: "50px" , marginBottom: "50px"}}>Your cart is empty!</h1>
        <Link to="/" className="backLink">
          &#8592; Back
        </Link>
      
      </div>
    );
  }

  return (
    <>
      <div style={{borderBottom: "1px solid black", width:"100%"}} className="cart__container">
        <h1 >Cart</h1>
        <Styledtable>
          
          <thead>
            <tr>
              <Styledth>Album</Styledth>
              <Styledth></Styledth>
              <Styledth>Price</Styledth>
              <Styledth>Stock</Styledth>
              <Styledth>Quantity</Styledth>
              <Styledth>Delete</Styledth>
            </tr>
          </thead>
          
          <tbody>
            {cart.map((product) => (
             <tr key={product._id}>
                <Styledtd>
                  <img className="cart__img" src={product.image} style={{ height: "100px", width: "100px" }} />
                </Styledtd>
                <Styledtd id="carttable">
                  <h4>{product.title}</h4>
                  <h5>{product.description}</h5>
                  Release date: {product.releaseyear}
                </Styledtd>
                <Styledtd>{product.price}kr</Styledtd>
                <Styledtd>{product.stock}</Styledtd>
                <Styledtd>
                  <div id="knappcontainer">
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => handlereduceProduct(product._id)}><AiFillMinusCircle /></motion.button>
                    <p>{product.quantity}</p>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleAddProduct(product._id)}><AiFillPlusCircle /></motion.button>
                  </div>
                </Styledtd>
                <Styledtd>
                  <Styleddeletebutton onClick={() => handleremoveProduct(product._id)}>Remove<FaTrashAlt /></Styleddeletebutton>
                </Styledtd>
              </tr>
            ))}
          </tbody>
        </Styledtable>
        <h4>Total price: Kr{totalPrice}</h4>
        <Styleddeletebutton style={{marginBottom:"100px"}} onClick={emptyCart}>Empty Cart</Styleddeletebutton>
      </div>
    </>
  );
}

const Styledtd = styled.td`
  border-bottom: 1px solid grey;
  text-align: left;
  padding: 8px;
`;

const Styledth = styled.th`
  border-bottom: 1px solid grey;
  text-align: center;
  padding: 8px;
`;

const Styledtable = styled.table`
  margin-top: 20px;
  border-collapse: collapse;
  border-bottom: 1px solid grey;

  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const Styleddeletebutton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;

  background-color: #921616;
  margin: 0 auto;
  padding: 5px;
 
  border-radius: 3px;
  transition: all 0.2s ease-in-out;

  &:active {
    transform: scale(0.9);
  }
 
`;


export default Cart;
