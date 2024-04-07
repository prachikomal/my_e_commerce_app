// ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardActionArea, CardContent, CircularProgress } from '@mui/material';
import '../styles/App.scss'; // Import the styles

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">Error: {error.message}</Typography>;
  }

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <div className="App">
      <Typography variant="h4">{product.title}</Typography>
      <Card className="product-card">
        <CardActionArea>
        <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>   
        <img src={product.images[0]} alt={product.title} style={{ width: '500px', height: '500px'}} />
         
        <Typography gutterBottom variant="h6" component="h2">
              {product.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Price: {product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default ProductDetails;
