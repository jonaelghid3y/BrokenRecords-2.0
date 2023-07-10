import React from 'react';
import styled from 'styled-components';
import { AiOutlineInstagram } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import { AiFillFacebook } from 'react-icons/ai';
import { RiSpotifyFill } from 'react-icons/ri';
import { TbTrademark } from 'react-icons/tb';
import { SiMastercard } from 'react-icons/si';
import { SiKlarna } from 'react-icons/si';
import { SiPaypal } from 'react-icons/si';

const Footer = () => {
  return (
    <div className="FooterTop">
      <div className="FooterContent">
        <div className="logoContainer">
          <h1 className='footerheadline'>
            <TbTrademark size={20} color='white'/> BROKEN RECORDS
          </h1>
        </div>
        <div className='phone-container'>
          <div className="CustomerService">
            <div> 
              <h3>
                Customer service
              </h3> 
            </div>
            <p>Contact us</p>
            <p>Order status</p>
            <p>Privacy policy & Cookies</p>
            <p>Return & QA</p>
          </div>
          <div className='rightContainer'>
            <div className='payHeadline'>
              <h3 className="ExtraSpace">
                Pay with
              </h3>
                <div className="PaymentContainer">
                  <SiMastercard  />
                  <SiKlarna  />
                  <SiPaypal  />
                </div>
            </div>
            <div className = 'socialContainer'>
                <div className='socialHeadline'>
                  <h3 className="ExtraSpace">
                    Find us at
                  </h3>
                </div>
              <div className="SocialLogos">
                <AiOutlineInstagram />
                <AiOutlineTwitter  />
                <AiFillFacebook />
                <RiSpotifyFill />
              </div>
            </div>
          </div>
        </div>
      </div>   
    </div>
  );
}

export default Footer;
