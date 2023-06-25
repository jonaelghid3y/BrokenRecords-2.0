// Header.jsx
import React, { useContext } from 'react';
import Nav from './Nav';
import Cart from './Cart';
import { CartContext } from './CartContext';
import styled from 'styled-components';



const Header = ({presentkortDivRef} ) => {

  const cartContext = useContext(CartContext);
  const { cart } = cartContext;

  return (
    <StyledHeaderdiv>
      <Nav presentkortDivRef={presentkortDivRef} cartLength={cart.length} cart={cart} />
    </StyledHeaderdiv>
  )
}

const StyledHeaderdiv = styled.div`
height: 80px;
display: flex;
align-items: center;
justify-content: center;
background-color: black;
`;



export default Header;
