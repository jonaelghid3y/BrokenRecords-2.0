import React from 'react'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ManageProducts = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [productList, setProductList] = useState([]);


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

   
    if (password === 'jonaelärsöt') {
      setAuthenticated(true);
    }
  };


    useEffect(() => {
      fetchProducts()
    }, []) 

    const fetchProducts = async () => {
      try {
        const response = await fetch("https://product-api-production-7dbf.up.railway.app/products");
        const productList = await response.json();
        setProductList(productList);
      } catch (error) {
        console.log(error)
      }
    }
  
  
  const deletePun = async (id) => {
    try {
      await fetch("https://product-api-production-7dbf.up.railway.app/products/" + id, {
        method: 'DELETE',
      });
        
      console.log(id)
      
      fetchProducts();
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <Manageproductspagediv>
    {authenticated ? (
      <>
        <Styledh1div>
          <h1 id="h1manage" >
            Manage products
          </h1>
          <Link id="createproductnavigering" to="/admin/createProduct">
            Add products
          </Link>
        </Styledh1div>
        <Styledtable >
          <thead style={{ backgroundColor: 'rgb(38, 38, 38)', color: 'white' }}>
            <tr>
              <Styledth>Image</Styledth>
              <Styledth>Album</Styledth>
              <Styledth>Artist</Styledth>
              <Styledth>Release year</Styledth>
              <Styledth>Price</Styledth>
              <Styledth>stock</Styledth>
              <Styledth>Hantera</Styledth>
            </tr>
          </thead>
          {productList.map((products) => (
            <tbody key={products['_id']}>
              <Styledtr>
                <Styledtd>
                  <img className="cart__img" 
                    src={products.image}
                    
                    alt="Product"
                  ></img>
                </Styledtd>
                <Styledtd>{products.title}</Styledtd>
                <Styledtd>{products.description}</Styledtd>
                <Styledtd>{products.releaseyear}</Styledtd>
                <Styledtd>{products.price}</Styledtd>
                <Styledtd>{products.stock}</Styledtd>
                <Styledtd >
                  <Link id="uppdateraKnapp" to={`/admin/Updateproduct/${products['_id']}`}>
                    Update
                  </Link>
                  <Styleddeletebutton
                    id="raderaKnapp"
                    onClick={() => {
                      deletePun(products['_id']);
                    }}
                  >
                    Delete
                  </Styleddeletebutton>
                </Styledtd>
              </Styledtr>
            </tbody>
          ))}
        </Styledtable>
      </>
    ) : (
      <PasswordForm onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password"
        />
        <button  id="submitbtnlösen"type="submit">Submit</button>
      </PasswordForm>
    )}
  </Manageproductspagediv>
);
};

const Manageproductspagediv = styled.div`
font-family: 'Lexend', sans-serif;
min-height: 100vh;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
padding-bottom: 100px;

background-image: url(https://images.unsplash.com/photo-1633012350330-a957eeb38487?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80);
background-size: cover;
`;

const Styledtable = styled.table`
border-collapse: collapse;
width: 60%;
padding-top: 50px;
padding-bottom: 50px;
font-size: 18px;
background-color: rgba(255, 255, 255, 0.5);
backdrop-filter: blur(10px);
color: black;
text-overflow: ellipsis;

  

@media (max-width: 992px) {


  font-size: 12px;
  
 
 
  


}
`;

const Styledtd = styled.td`
border: 1px solid grey;
text-align: left;
padding: 8px;
text-overflow: ellipsis;
overflow: hidden;
@media (max-width: 992px) {


  max-width: 40px;
  text-overflow: ellipsis;
  padding:2px;
  


}

`;

const Styledth = styled.th`
text-align: left;
padding: 8px;
text-overflow: ellipsis;

    overflow: hidden;
@media (max-width: 992px) {


  width: 40px;
  padding:2px;
  


}

`;

const Styledtr = styled.tr`
&:hover {
  background-color: rgba(255, 255, 255, 0.7);
  border: 1px solid white;
  text-overflow: ellipsis;
  
    overflow: hidden;
  @media (max-width: 992px) {


    width: 40px;
    padding:2px;
    
  
  
  }
}
`;

const Styledh1div = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 50px;
color: white;
margin-top: 50px;
margin-bottom: 50px;
width: 80vw;
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
font-weight: bold;
@media (max-width: 992px) {

  flex-direction: column;
  font-size: 15px;
  gap: 20px;
 


}
`;

const PasswordForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
margin-top: 50px;


`;

const Styleddeletebutton = styled.button`
border-radius: 5px;
color: white;
border: none;
background-color: rgb(212, 50, 50);
text-align: center;
padding: 5px 5px;
font-weight: bold;
height: 35px;
&:active {
  transform: scale(0.9);
}
@media (max-width: 992px) {


 font-size: 10px;
 height: 20px;
  


}
`;

export default ManageProducts;