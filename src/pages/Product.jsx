import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../components/CartContext';
import {FaShippingFast} from 'react-icons/fa';
import {SiKlarna} from 'react-icons/si';
import {AiFillCreditCard} from 'react-icons/ai';

const Product = () => {
  // retrieve id parameter from URL
  const { id } = useParams();
  // retrieve addToCart function from CartContext
  const { addToCart } = useContext(CartContext);
  // create state variable for product and alert message
  const [product, setProduct] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  // fetch product data from API when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://product-api-production-7dbf.up.railway.app/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  // update product stock and alert message when user adds product to cart
  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product);
      setProduct({ ...product, stock: product.stock - 1 });
      if (product.stock <= 10) {
        setAlertMessage(`Only ${product.stock} left in stock!`);
      }
    }
  };

  // display loading message if product data is not yet retrieved
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <ImgBackgroud>
        <InfoContainer> 
          <ImgContainer src={product.image} alt="" />
        </InfoContainer>
      </ImgBackgroud>
      <div>
        <TextBox>
          <div>
            <Title>{product.title}</Title>
            <h2>{product.description}</h2>
          </div>
          <div>
            <h3>{product.releaseyear}</h3>
          </div>
          <Button onClick={handleAddToCart}>Add to cart</Button>
          <PP>
            <PriceBox>
              <h4>{product.price} :-</h4>
            </PriceBox>
            <Quantety>
              <h4>{product.stock} in stock</h4>
            </Quantety>
          </PP>
          {/* display alert message if product stock is low or out of stock */}
          {product.stock <= 10 && (
            <Alert stock={product.stock}>
              There are only {product.stock} left in stock!
            </Alert>
          )}
          {product.stock === 0 && (
            <Alert stock={product.stock}>
              OPS! This product is out of stock.
            </Alert>
          )}
          <Icons>
            <div><FaShippingFast size={25} /></div>
            <Space><SiKlarna color='pink' size={25} /></Space>
            <Space><AiFillCreditCard size={25} /></Space>
          </Icons>
        </TextBox>
      </div>    
    </Wrapper>
  );
};


const Alert = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: ${props => props.stock === 0 ? 'red' : 'yellow'};
`;

const Title = styled.h1`
  font-size: 45px;
  font-family: 'Lexend', sans-serif;
  text-align:left;
  color: black;
`;

const ImgBackgroud = styled.div `
  background-color: rgba(255,255,255,.5);
  backdrop-filter: blur(10px);
  box-shadow: -20px 20px 10px rgba(0,0,0,0.3);
  height: 500px;
  width: 500px;
  align-items: center;
  border-radius: 10px;
  margin: 30px 10px;
`;
const Wrapper = styled.div`
  background-image: url(https://images.unsplash.com/photo-1458560871784-56d23406c091?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80);
  background-size: cover;
  object-fit: fit;
  display: flex;
  justify-content: right;
  align-items: center;
  height: 900px;
`; 
const InfoContainer= styled.div`
text-align: left;
height: auto;
width: 500px;
`; 
const ImgContainer = styled.img`
  border-radius: 25px;
  height: 500px;
  width: 500px;
`; 

const TextBox = styled.div `
  background-color: rgba(255,255,255,.5);
  backdrop-filter: blur(10px);
  justify-content: center;
  align-items: center; 
  padding: 50px;
  margin: 30px 20px 30px 95px;
  text-align: left;
  height: auto;
  width: 600px;
`;

const PP = styled.div `
display: flex;
border-bottom: 2px solid black;
border-top: 2px solid black;
padding: 10px 0px 10px 0px;
margin-top: 40px;
`;
const Icons = styled.div `
display: flex;
margin-top: 20px;
`;
const Space = styled.div` 
   margin-left: 20px;
`;

const Quantety = styled.div `
margin-left: 10px; 
border: 2px solid black;
padding: 5px;
border-radius: 3px; 
`;
const PriceBox = styled.div`
background-color: skyblue;
padding: 5px;
border-radius: 3px; 
`;


const Button = styled.button`
  color: white;
  background: limegreen;
  margin-top: 20px;
  font-size: 15px;
  font-family: 'Lexend', sans-serif;
  padding: 2px 5px;
  border-radius: 8px;
  height: 35px;
  width: 200x;
`;


export default Product;
