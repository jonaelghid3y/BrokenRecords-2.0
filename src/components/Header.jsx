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
height: 150px;
display: flex;
align-items: center;
justify-content: center;
gap: 50px;
background-color: black;
`;



export default Header;
