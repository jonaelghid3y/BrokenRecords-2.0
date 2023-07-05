import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const CreateProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [releaseyear, setReleaseYear] = useState('');
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [image, setImage] = useState("")
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      title,
      description,
      price,
      stock,
      category,
      releaseyear,
      image
    };

    try {
      const response = await fetch('https://product-api-production-7dbf.up.railway.app/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('Success:', data)
      navigate("/admin/ManageProducts");
    } catch (error) {
      console.error('Error:', error);
    }
    console.log(formData)
    navigate('/admin/Manageproducts')
  }

  return (
    <Styleduppdateproductsdiv>
      <h1 style={{ margin: "50px", color: "white", fontSize: "60px" }}> Create a Product</h1>
      <Styledform id="form" className="formContainer" onSubmit={handleSubmit}>  
        <h4>Album</h4>
        <input
          style={{ color: "black", fontSize: "15px" }}
          type="text"
          className="titleInput"
          placeholder="Album Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}/>
        <h4>Artist</h4>
        <input
          style={{ color: "black", fontSize: "15px" }}
          type="text"
          className="artistInput"
          placeholder="Artist Name"
          value={description}
          onChange={(e) => setDescription(e.target.value)}/>
        <h4>Release year</h4>
        <input
          style={{ color: "black", fontSize: "15px" }}
          type="text"
          className="releaseYearInput"
          pattern="[0-9]{4}"
          placeholder="Release Year"
          value={releaseyear}
          onChange={(e) => setReleaseYear(e.target.value)}/>
        <h4>Genre</h4>
        <input
          style={{ color: "black", fontSize: "15px" }}
          type="text"
          className="genreInput"
          placeholder="Music Genre"
          value={category}
          onChange={(e) => setCategory(e.target.value)}/>
        <h4>Price</h4>
        <input
          style={{ color: "black", fontSize: "15px" }}
          type="number"
          className="priceInput"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}/>
        <h4>Stock</h4>
        <input
          style={{ color: "black", fontSize: "15px" }}
          type="number"
          className="stockInput"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}/>
        <img  src={image} className="imagePreview" />
        <h4>Image URL</h4>
        <input
          style={{ color: "black", fontSize: "15px" }}
          type="text"
          className="imageURLInput"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}/>
        <button className="updateButton">Create</button>
        <Link to="/admin/Manageproducts" className="backLink">
          &#8592; Back
        </Link>
      </Styledform>
    </Styleduppdateproductsdiv>
  );
}

const Styleduppdateproductsdiv = styled.div`
  min-height: 535px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 100px;
  min-height: 535px;
  background-image: url(https://images.unsplash.com/photo-1633012350330-a957eeb38487?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=385&q=80);
  background-size: contain;
  
  `;
const Styledform = styled.form`

  background-color: #343030;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 35vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 992px) {

    width: 90vw;
   
  
  
  }
 
 
`;
const Styledimg = styled.img`
  border-radius: 20px;
  height: 200px;
  object-fit: contain;
  margin-bottom: 10px;
`;

export default CreateProduct;
