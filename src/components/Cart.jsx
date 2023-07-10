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
        
        <h1 style={{margin: "20px"}}>Your cart is empty!</h1>
        <Link to="/" className="backLink">
          &#8592; Back
        </Link>
      
      </div>
    );
  }

  return (
    <>
      <div  className="cart__container">
        <h1 style={{marginTop: '50px'}} >Cart</h1>
        <Styledtable>
          
          <thead >
           
              <Styledth>Album</Styledth>
              <Styledth></Styledth>
              <Styledth>Price</Styledth>
              <Styledth>Stock</Styledth>
              <Styledth>Quantity</Styledth>
              <Styledth>Delete</Styledth>
            
          </thead>
          
          <tbody>
            {cart.map((product) => (
             <tr key={product._id}>
                <Styledtd>
                  <img className="cart__img" src={product.image} />
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
                    <motion.button style={{color: 'white'}} whileHover={{scale: 1.2}} whileTap={{ scale: 0.8 }} onClick={() => handlereduceProduct(product._id)}><AiFillMinusCircle size={20} /></motion.button>
                    <p>{product.quantity}</p>
                    <motion.button style={{color: 'white'}} whileHover={{scale: 1.2}} whileTap={{ scale: 0.8 }} onClick={() => handleAddProduct(product._id)}><AiFillPlusCircle size={20} /></motion.button>
                  </div>
                </Styledtd>
                <Styledtd>
                  <motion.div whileHover={{scale: 1.2}} whileTap={{ scale: 0.8 }}>
                  <Styleddeletebutton onClick={() => handleremoveProduct(product._id)}><FaTrashAlt /></Styleddeletebutton>
                  </motion.div>
                </Styledtd>
              </tr>
            ))}
          </tbody>
        </Styledtable>
        <h3 id="cartPrice">Total price: {totalPrice} Kr</h3>
        <motion.div whileHover={{scale: 1.2}} whileTap={{ scale: 0.8 }}>
        <Styleddeletebutton 
         onClick={emptyCart}>Empty Cart</Styleddeletebutton>
        </motion.div>
  
      </div>
    </>
  );
}

const Styledtd = styled.td`
  border-bottom: 1px solid white;
  text-align: center;
  height: 50px;
  padding: 8px;
  @media (max-width: 992px) {

    padding: 2px;
    font-size: 10px;
    
   
  
  
  }

`;

const Styledth = styled.th`
  border-bottom: 1px solid white;
  text-align: center;
  padding: 8px;
  @media (max-width: 992px) {

    padding: 2px;
    font-size: 10px;
   
  
  
  }
  
`;

const Styledtable = styled.table`
  margin-top: 20px;
  border-collapse: collapse;
  border-bottom: 1px solid white;

  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  
  
`;

const Styleddeletebutton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  height: 25px;
  background-color: #921616;
  margin: 0 auto;
  padding: 5px;
 
  border-radius: 3px;
  transition: all 0.2s ease-in-out;


 
`;


export default Cart;
