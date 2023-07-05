import { color } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';


const UpdateProduct = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseyear, setReleaseYear] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');

  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://product-api-production-7dbf.up.railway.app/products/" + params.id);
        const product = await response.json();
        setProduct(product);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, [params.id]);

  useEffect(() => {
    // Update state values once product state is available
    setTitle(product.title || '');
    setDescription(product.description || '');
    setCategory(product.category || '');
    setReleaseYear(product.releaseyear || '');
    setPrice(product.price || '');
    setStock(product.stock || '');
    setImage(product.image || '');
  }, [product])

  const handleSubmit = async (e) => {
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
      await fetch("https://product-api-production-7dbf.up.railway.app/products/" + params.id, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(formData)
      // Redirect without page reload
      navigate("/admin/ManageProducts");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Styleduppdateproductsdiv>
      <h1 style={{ margin: "50px", color: "white", fontSize: "60px" }}> Update a Product</h1>
      <Styledform  id="form" className="formContainer" onSubmit={handleSubmit}>
        <h4>Album</h4>
        <input
        style={{color: "black" ,fontSize:"15px"}}
          type="text"
          className="titleInput"
          placeholder="Album Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h4>Artist</h4>
        <input
        style={{color: "black" ,fontSize:"15px"}}
          type="text"
          className="artistInput"
          placeholder="Artist Name"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <h4>Release year</h4>
        <input
        style={{color: "black" ,fontSize:"15px"}}
          type="text"
          className="releaseYearInput"
          pattern="[0-9]{4}"
          placeholder="Release Year"
          value={releaseyear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <h4>Genre</h4>
        <input
        style={{color: "black" ,fontSize:"15px"}}
          type="text"
          className="genreInput"
          placeholder="Music Genre"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <h4>Price</h4>
        <input
        style={{color: "black" ,fontSize:"15px"}}
          type="number"
          className="priceInput"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <h4>Stock</h4>
        <input
        style={{color: "black" ,fontSize:"15px"}}
          type="number"
          className="stockInput"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <img src={image} className="imagePreview" />
        <h4>Image URL</h4>
        <input
        style={{color: "black" ,fontSize:"15px"}}
          type="text"
          className="imageURLInput"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button className="updateButton">Update</button>
        <Link to="/admin/Manageproducts" className="backLink">
          &#8592; Back
        </Link>
      </Styledform>
    </Styleduppdateproductsdiv>
  )
}

const Styleduppdateproductsdiv = styled.div`
 width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 100px;
  border: 1px solid black;
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


export default UpdateProduct