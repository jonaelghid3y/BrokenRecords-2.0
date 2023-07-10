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
  const [addedToCart, setAddedToCart] = useState(false);
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
      setAddedToCart(true);
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000); 
    }
  };

  // display loading message if product data is not yet retrieved
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
      <ProdContainer>
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
          {addedToCart && (
            <NotificationContainer>
              <NotificationText>Your item has been added to the cart!</NotificationText>
            </NotificationContainer>
          )}
          <Icons>
            <div><FaShippingFast size={25} /></div>
            <Space><SiKlarna color='pink' size={25} /></Space>
            <Space><AiFillCreditCard size={25} /></Space>
          </Icons>
        </TextBox>
        </div>    
      </ProdContainer>
    </Wrapper>
  );
};


const Wrapper = styled.div`
background-image: url(/imgs/prodbg.jpg);
  background-size: cover;
  object-fit: fit;
  display: flex;
  justify-content: right;
  align-items: center;
  height: 100vh;

  @media only screen and (max-width: 992px){
    // border: 2px red dashed;
    background-image: url(/imgs/prodbg.jpg);
    background-size: cover;
    object-fit: fit;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`; 

const ProdContainer = styled.div `
  display: flex;
  background-color: rgba(80,80,80,.5);
  backdrop-filter: blur(4px);
  justify-content: space-around;
  align-items: center; 
  padding: 50px;
  margin: 20px 30px ;
  width: 100%;
  border-radius: 15px;  

  @media only screen and (max-width: 992px) {
    // border: 2px dashed yellow;
    height: 500px;
    width: 90%;
    display: flex;
    flex-direction: column;
    background-color: rgba(80,80,80,.5);
    backdrop-filter: blur(4px);
    align-items: center; 
    justify-content center;
    margin: 20px;
    border-radius: 15px;  
  }

`;
const NotificationContainer = styled.div`
  position: top;
  bottom: 20px;
  right: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const NotificationText = styled.p`
  margin: 0;
`;


const Alert = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: ${props => props.stock === 0 ? 'red' : 'yellow'};

  @media only screen and (max-width: 992px) {
  font-size: 10px;
  margin-top: 5px;
  padding: 5px;
  }
`;

const Title = styled.h1`
  font-size: 45px;
  font-family: 'Lexend', sans-serif;
  text-align:left;
  color: white;;

  @media only screen and (max-width: 992px) {
    font-size: 30px;
  }
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

  @media only screen and (max-width: 992px) {
    // border: 2px skyblue dashed;
    height: 200px;
    width: 200px;
    align-items: center;
    border-radius: 10px;
    margin: 30px 10px;
  }
  
`;
const InfoContainer= styled.div`
  text-align: left;
  height: auto;
  width: 500px;

  @media only screen and (max-width: 992px) {
    // border: red dashed 2px;
    height: auto;
    width: 200px;
  }
`; 
const ImgContainer = styled.img`
  border-radius: 10px;
  height: 500px;
  width: 500px;

  @media only screen and (max-width: 992px){
    height: 200px;
    width: 200px;
    margin-bottom: -10px;
  }
`; 

const TextBox = styled.div `
justify-content: center;
  align-items: center; 
  padding: 50px;
  margin: 30px 20px 30px 95px;
  text-align: left;
  width: 600px;
  color: rgb(153, 153, 153);

  @media only screen and (max-width: 992px) {
    // border: 2px white dashed;
    justify-content: center;
    align-items: center; 
    text-align: left;
    margin: auto;
    padding: 15px;
    width: auto;
    height: 60vh;
  }
`;

const PP = styled.div `
display: flex;
border-bottom: 2px solid white;
border-top: 2px solid white;
padding: 10px 0px 10px 0px;
margin-top: 40px;

@media only screen and (max-width: 992px) {
  // border: 2px dashed white;
  justify-content: center;
  margin-top: 10px;

}
`;
const Icons = styled.div `
display: flex;
margin-top: 20px;
color: white;
`;
const Space = styled.div` 
  margin-left: 20px;
`;

const Quantety = styled.div `
border: 1px solid rgb(153, 153, 153);
border-radius: 5px; 
padding: 10px;
font-size: 18px;
color: white;
margin-left: 20px;

@media only screen and (max-width: 992px) {
  height: 40px;
  width: 90px;
  justify-content:center;
  border: 1px solid rgb(153, 153, 153);
  border-radius: 5px; 
  font-size: 12px;
  color: white;
}

`;
const PriceBox = styled.div`
display:flex;
width: 100px;
background-color: skyblue;
padding: 10px;
justify-content:center;
border-radius: 5px; 
font-size: 18px;
color: black;

@media only screen and (max-width: 992px) {
  height: 40px;
  width: 75px;
  background-color: skyblue;
  justify-content:center;
  border-radius: 5px; 
  font-size: 15px;
  color: black;
}

`;


const Button = styled.button`
  font-weight: 600;
  color: black;
  background-color:rgb(249, 204, 2);
  padding: 10px;
  margin-top: 25px;
  min-width: 150px;
  border-radius: 20px;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;

  &:hover {
    background-color: rgb(255, 231, 95);
    color: black;
    box-shadow: 0 0 20px #6fc5ff50;
    transform: scale(1.1);
  }
  @media only screen and (max-width: 992px) {
    min-width: 100px;
    font-weight: 600;
      font-size: 15px;
    justify-content: center;
    margin-top: 10px;


  }
`;


export default Product;
