import React from 'react';
import { useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom'; // Updated import
import CartContextProvider from '../components/CartContext';




const Root = () => {
   
    return (
        <>
        <CartContextProvider>
            <Header   />
            <Outlet   />
            <Footer />
        </CartContextProvider>
       
        </>
    );
};

export default Root;
