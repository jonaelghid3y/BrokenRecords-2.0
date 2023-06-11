import React from 'react'
import styled from 'styled-components'
import {AiOutlineInstagram} from 'react-icons/ai'
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiFillFacebook} from 'react-icons/ai'
import {RiSpotifyFill} from 'react-icons/ri'
import {TbTrademark} from 'react-icons/tb'
import {SiMastercard} from 'react-icons/si'
import {SiKlarna} from 'react-icons/si';
import {SiPaypal} from 'react-icons/si'

const Footer = () => {
  return (
    <FooterTop>
      <FooterContent className="footerContent">
        <div className="logoContainer">
          <h1>
          <TbTrademark size={20} color='white'/> BROKEN RECORDS
          </h1>
        </div>
        <div>
          <CustomerService>
            <h3>
              Costumer service
            </h3>
            <p>Contact us</p>
            <p>Order status</p>
            <p>Privacy policy & Cookies</p>
            <p>Return & QA</p>
          </CustomerService>
        </div>
        <div>
        <ExtraSpace>
          Pay with
        </ExtraSpace>
          <PaymentContainer>
            <SiMastercard color='white' size={25}/>
            <SiKlarna color='white' size={25}/>
            <SiPaypal color='white' size={25}/>
          </PaymentContainer>
        </div>
        <div>
          <div className='socialHeadline'>
            <ExtraSpace>
              Find us at
            </ExtraSpace>
          </div>
          <SocialLogos>
            <AiOutlineInstagram size={25}/>
            <AiOutlineTwitter size={25} />
            <AiFillFacebook size={25}/>
            <RiSpotifyFill size={25}/>
          </SocialLogos>
        </div>
      </FooterContent>   
    </FooterTop >

  )
}

const FooterTop = styled.div`
  background: black;
  display: flex;
  justify-content: center;
  aline-itenms: center;
  flex-direction: row;
  background-color: black;
`;

const FooterContent = styled.div`
  padding:30px;
  width: 2400px;
  height: 180px;
  color: white;
  display: flex;
  justify-content: space-between;
`;

const CustomerService = styled.ul`
  display: flex;
  flex-direction: column;

  & > * {
    margin-top: 5px;
    text-align: left;
  }
  &:hover {
    cursor: pointer;
  }
`;


const SocialLogos = styled.div`
display: flex;

& > * {
  margin: 20px;
  margin-top:10px;
  text-align: left;
}
&:hover {
  cursor: pointer;
}
& > * {
  margin-right: 10px;
}
& > svg:nth-of-type(1):hover {
  fill: pink;
}

& > svg:nth-of-type(2):hover {
  fill: #00acee;
}

& > svg:nth-of-type(3):hover {
  fill: #3b5998;
}

& > svg:nth-of-type(4):hover {
  fill: limegreen;
}

`;

const PaymentContainer = styled.div`
display: flex;

& > * {
  margin: 20px;
  margin-top:10px;
  text-align: left;
}
`;
const ExtraSpace = styled.h3`
  margin-left: 20px;
`;

export default Footer