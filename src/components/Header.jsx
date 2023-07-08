// Header.jsx
import React, { useContext } from 'react';
import Nav from './Nav';
import Cart from './Cart';
import { CartContext } from './CartContext';
import styled from 'styled-components';



const Header = () => {

  const cartContext = useContext(CartContext);
  const { cart } = cartContext;

  return (
    <StyledHeaderdiv>
      <Nav cartLength={cart.length} cart={cart} />
    </StyledHeaderdiv>
  )
}

const StyledHeaderdiv = styled.div`
height: 80px;
display: flex;
align-items: center;
justify-content: center;
background-color: black;
@media (max-width: 992px) {

 height: 60px;

 


}

`;



export default Header;
