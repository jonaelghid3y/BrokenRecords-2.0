import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom'; // Updated import
import CartContextProvider from '../components/CartContext';




const Root = () => {
    const presentkortDivRef = useRef(null);
    return (
        <>
        <CartContextProvider>
            <Header  presentkortDivRef={presentkortDivRef} />
            <Outlet  presentkortDivRef={presentkortDivRef} />
            <Footer />
        </CartContextProvider>
       
        </>
    );
};

export default Root;
