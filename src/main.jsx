import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './pages/Root';
import Products from './pages/Products'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import CreateProduct from './pages/admin/CreateProduct'
import ManageProducts from './pages/admin/ManageProducts'
import UpdateProduct from './pages/admin/UpdateProduct';
import CartContextProvider from './components/CartContext';
import About from './pages/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,

    children: [
      {
        path: "/",
        element: < Products />,
      },
      {
        path: "/Product/:id",
        element: <Product />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/Checkout",
        element: <Checkout />,
      },
      {
        path: "admin/CreateProduct",
        element: <CreateProduct />,
      },
      {
        path: "admin/ManageProducts",
        element: <ManageProducts />,
      },
      {
        path: "admin/UpdateProduct/:id",
        element: <UpdateProduct />,
      },

    ]
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  </React.StrictMode>,
)
