import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { RiUserSettingsLine } from 'react-icons/ri';
import { CartContext } from '../components/CartContext';
import { AiFillPlusCircle } from 'react-icons/ai';
import { AiFillMinusCircle } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTrashAlt } from 'react-icons/fa';
import { motion } from "framer-motion";
import styled from 'styled-components';

const Nav = () => {
  const location = useLocation();
  const { cart, setCart, addProduct, reduceProduct, removeProduct } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
  };

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartHover = () => {
    setIsCartOpen(true);
  };

  const handleCartLeave = () => {
    setIsCartOpen(false);
  };

  useEffect(() => {
    const presentkortDiv = document.getElementById('presentkortdiv');
    const productsDiv = document.getElementById('productdiv');

    if (location.hash === '#presentkortdiv' && presentkortDiv) {
      setTimeout(() => {
        presentkortDiv.scrollIntoView({ block: 'start' });
      }, 500);
    }

    if (location.hash === '#productdiv' && productsDiv) {
      setTimeout(() => {
        productsDiv.scrollIntoView({ block: 'start' });
      }, 500);
    }
  }, [location]);

  const cartLength = cart.reduce((total, item) => total + item.quantity, 0);
  

  return (
    <motion.div initial={{ opacity: 0, width: '100%' }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
      <StyledNav>
        <StyledHamburgerIcon onClick={toggleMenu}>
          <GiHamburgerMenu size={25} />
        </StyledHamburgerIcon>
        <Stylednavbar isOpen={isMenuOpen}>
          <Link to="/#productdiv">
            <Stylednavbarlänk onClick={toggleMenu}>Products</Stylednavbarlänk>
          </Link>
          <Link to="/#presentkortdiv">
            <Stylednavbarlänk onClick={toggleMenu}>Giftcards</Stylednavbarlänk>
          </Link>
          <Link to="/about">
            <Stylednavbarlänk onClick={toggleMenu}>About</Stylednavbarlänk>
          </Link>
        </Stylednavbar>
       
        <Styledloggadiv id="loggan">
          <StyledNamediv>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
            >
              BROKEN
            </motion.h1>
          </StyledNamediv>

          <Link to="/" style={{ color: "white" }}>
            <Styledlogdiv1>
              <motion.img
              
                  initial={{ opacity: 0 }}
               animate={{  opacity: 1, rotate: [0, 840, 0] }}
                transition={{ duration: 2 }}
                whileHover={{ rotate: 840, transition: { duration: 5, repeat: Infinity } }}
                id="loggabild" src="https://cdn4.iconfinder.com/data/icons/music-209/32/Music_dj_turntable_vinyl_disc-256.png"></motion.img>
            </Styledlogdiv1>

          </Link>

          <StyledNamediv>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
            >

              RECORDS
            </motion.h1>        </StyledNamediv>
        </Styledloggadiv>

        
      
      
    


        <Styledcartbutton style={{ marginRight: "10px", color: "white" }}>
          <div
            onMouseEnter={handleCartHover}
            onMouseLeave={handleCartLeave}
            
          >
            <Link to="/Checkout" style={{ color: "white" }}>
              <StyledIcon2 className="icons" />
            </Link>
            {isCartOpen && (
              <div
                id="carthoverdiv"
                
              >
                {cart.length === 0 ? (
                  <h1 style={{ color: "black" }}>Your cart is empty.</h1>
                ) : (
                  <>
                    <h1 style={{ color: "black", margin: "0 auto" }}>CART</h1>
                    <table style={{ color: "black", borderCollapse:'collapse;' }}>
                      <thead></thead>
                      <tbody>
                        {cart.map((Product) => (
                          <tr key={Product._id}>
                            <td>
                              <img src={Product.image} style={{ height: "50px" }} />
                            </td>
                            <td style={{padding: '5px'}}>
                              <h5>{Product.title}</h5>
                              <h6> {Product.description}</h6>
                            </td>
                            <td style={{padding: '5px'}}>
                              <h5>Stock:{Product.stock}</h5>
                              {Product.price} kr
                            </td>
                            <td style={{padding: '5px'}}>
                              <div id="knappcontainer">
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handlereduceProduct(Product._id)}
                              >

                                <AiFillMinusCircle  />
                              </motion.button>

                              {Product.quantity}
                              <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleAddProduct(Product._id)}>
                                <AiFillPlusCircle  />
                              </motion.button>
                              </div>
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
          <Link
            className="icons"
            style={{ color: "white" }}
            to="/admin/Manageproducts">
            <StyledIcon/>
          </Link>
        </Styledcartbutton>




      </StyledNav>
    </motion.div>
  );
};

const StyledNav = styled.nav`
display: flex;
align-items: center;
width: 100%;
color: white;
padding: 40px;
height: 110px;
justify-content: space-between;
@media (max-width: 992px) {

  padding: 30px;

 


}





`;
const Stylednavbar = styled.div`
display: flex;
align-items: center;
flex-direction: row;
gap: 20px;
font-family: 'Lexend', sans-serif;
text-decoration: none;
color: white;
font-size: 15px;
font-weight: semi-bold;
width: 25vw;

transition: 1s;

  @media (max-width: 992px) {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: absolute;
    top: 59px;
    right: 0;
    background-color: #333;
    padding: 20px;
    font-size: 10px;
    width: 150px;
  
  }
`;
const Stylednavbarlänk = styled.h2`
text-decoration: none;
font-family: 'Lexend', sans-serif;
color: white;
font-size: 20px;



&:hover{
  scale: 1.1;
  color:rgb(241, 198, 6);

 
`;
const Styledloggadiv = styled.div`
  display: flex;
  align-items: center;
 
 
  

`;




const StyledNamediv = styled.div`
  dispaly: flex;
  align-items: center;
  font-family: 'Lexend', sans-serif;
  font-size: 20px;
  margin-left: 5px;
  margin-right: 5px;
  @media (max-width: 992px) {
    font-size: 11px;
    display:none;
    
  }
`;

const Styledlogdiv1 = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;





const Styledcartbutton = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
width: 25vw;
@media (max-width: 992px) {
  padding-right: 3vw;
  
}
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
@media (max-width: 992px) {
 height:15px;
 width:15px;
 font-size: 12px;

}
`;

const StyledHamburgerIcon = styled.div`
  display: none;


  @media (max-width: 992px) {
    @media (max-width: 992px) {
      display:block;
     
      position: absolute; 
      top: 10;
      right: 0; 
      cursor: pointer;
      color: white;
      z-index: 999; 
      margin-right: 2.5vw
    }
  }
`;

const StyledIcon = styled(RiUserSettingsLine)`
  /* Default styles */
  width: 25px;
  height: 25px;

  @media (max-width: 768px) {
    /* Mobile styles */
    width: 20px;
    height: 20px;
  }
`;
const StyledIcon2 = styled(BsCart4)`
  /* Default styles */
  width: 25px;
  height: 25px;

  @media (max-width: 768px) {
    /* Mobile styles */
    width: 20px;
    height: 20px;
  }
`;




export default Nav;