import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { RiUserSettingsLine } from 'react-icons/ri';
import { CartContext } from '../components/CartContext';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AiFillMinusCircle } from 'react-icons/ai';
import { FaTrashAlt } from 'react-icons/fa';
import "@fontsource/bebas-neue";
import { motion } from "framer-motion"
import styled from 'styled-components';


const Nav = () => {



  const location = useLocation();
  const { cart, setCart, addProduct, reduceProduct, removeProduct } = useContext(CartContext);

  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleAddProduct = (productId) => {
    addProduct(productId);
  };

  const handlereduceProduct = (productId) => {
    reduceProduct(productId);
  };

  const handleremoveProduct = (productId) => {

    removeProduct(productId);



  };
  const emptyCart = () => {
    setCart([]);
  }
  const [isOpen, setIsOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false); 

  const handleCartHover = () => {
    setIsCartOpen(true); 
  };

  const handleCartLeave = () => {
    setIsCartOpen(false); 
  };


  const cartLength = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <StyledNav>
      <Styledloggadiv>
        <Link to="/" style={{ color: "white" }}>
          <Styledlogdiv1>
            <h1 >BR</h1>
            <motion.img
              style={{
                backgroundcolor: "rgb(241, 198, 6)",
                borderradius: "50%",
                width: "50px",
                height: "50px"
              }}
              whileHover={{ rotate: 720, transition: { duration: 3 } }}
              id="loggabild" src="https://cdn4.iconfinder.com/data/icons/music-209/32/Music_dj_turntable_vinyl_disc-256.png"></motion.img>
            <h1>KEN</h1> <br />
          </Styledlogdiv1>
          <h1>RECORDS</h1>

        </Link>

      </Styledloggadiv>
      <Stylednavbar>
        <Link className="navbarlänk"
          to="/"
        >
          Products
        </Link>

        <Stylednavbarlänk>Giftcards </Stylednavbarlänk>
        <Stylednavbarlänk>About </Stylednavbarlänk>
      </Stylednavbar>

      <Styledicondiv>
        <Styledcartbutton style={{ marginRight: "10px", color: "white" }}>
          <div
            onMouseEnter={handleCartHover}
            onMouseLeave={handleCartLeave}
            style={{ position: "relative" }}
          >
            <Link to="/Checkout" style={{ color: "white" }}>
              <BsCart4 size={30} className="icons" />
            </Link>
            {isCartOpen && (
              <div
                id="carthoverdiv"
                style={{
                  opacity: isCartOpen ? 1 : 0,
                  transition: "opacity 0.3s ease-in-out",
                }}
              >
                {cart.length === 0 ? (
                  <h1 style={{ color: "black" }}>Your cart is empty.</h1>
                ) : (
                  <>
                    <h1 style={{ color: "black", margin: "0 auto" }}>CART</h1>
                    <table style={{ color: "black" }}>
                      <thead></thead>
                      <tbody>
                        {cart.map((Product) => (
                          <tr key={Product._id}>
                            <td>
                              <img src={Product.image} style={{ height: "50px" }} />
                            </td>
                            <td>
                              <h5>{Product.title}</h5>
                              <h6> {Product.description}</h6>
                            </td>
                            <td>
                              <h5>Stock:{Product.stock}</h5>
                              {Product.price} kr
                            </td>
                            <td>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handlereduceProduct(Product._id)}
                              >
                                <AiFillMinusCircle style={{ marginRight: "5px" }} />
                              </motion.button>
                              {Product.quantity}
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleAddProduct(Product._id)}
                              >
                                <AiFillPlusCircle style={{ marginLeft: "5px" }} />
                              </motion.button>
                            </td>
                            <td>
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleremoveProduct(Product._id)}
                              >
                                <FaTrashAlt />
                              </motion.button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <h4 style={{ color: "black" }}>Total price: {totalPrice} kr</h4>
                    <motion.button whileTap={{ scale: 0.9 }} >
                      <Link id="checkoutknapp" to={"/Checkout"}>
                        Checkout
                      </Link>

                    </motion.button>
                    <motion.button whileTap={{ scale: 0.9 }} className="DeleteButton" onClick={emptyCart}>
                      Empty cart
                    </motion.button>
                  </>
                )}
              </div>
            )}
          </div>

          <Styledcartcount style={{ marginRight: "10px" }}>
            {cartLength}
          </Styledcartcount>
        </Styledcartbutton>

        <Link
          className="icons"
          style={{ color: "white" }}
          to="/admin/Manageproducts"
        >
          <RiUserSettingsLine size={30} />
        </Link>
      </Styledicondiv>
    </StyledNav>
  );
};
const StyledNav = styled.nav`
display: flex;
align-items: end;
gap: 16%;
width: 100%;
color: white;
`;
const Styledicondiv = styled.div`
display: flex;
align-items: center;
flex-direction: row;
position: absolute;
right: 150px;
color: white
`;
const Styledloggadiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 250px;
height: 100px;
margin-left: 100px;
font-size: 40px;
font-family: "Bebas Neue";

`;
const Styledlogdiv1 = styled.div`
display: flex;
flex-direction: row;
align-items: center;


`;
const Stylednavbar = styled.div`

display: flex;
flex-direction: row;
gap: 20px;
text-decoration: none;
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
color: white;
font-size: 20px;
font-weight: bold;
transition: 1s;
`;

const Stylednavbarlänk = styled.p`

text-decoration: none;
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
color: white;
font-size: 25px;
font-weight: bold;

&:hover{
  scale: 1.1;
  color:rgb(241, 198, 6);

}
`;
const Styledcartbutton = styled.div`
display: flex;
align-items: center;
`;
const Styledcartcount = styled.span`

display: flex;
align-items: center;
justify-content: center;
margin-bottom: 20px;
border-radius: 50%;
width: 20px;
height: 20px;
font-weight: bolder;
background-color: rgb(241, 198, 6);
color: rgb(14, 13, 13);

`;


export default Nav;
