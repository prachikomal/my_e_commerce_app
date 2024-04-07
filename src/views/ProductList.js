// ProductList.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/App.scss";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
        setTotal(data.total);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const handleEndPage = () => {
    setPage(Math.ceil(total / 10));
  };

  const handleFirstPage = () => {
    setPage(1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
    <h2>Products Listing Page</h2>
    <div className="product-container">
      {products.products.map((product) => (
        <Link to={`/products/${product.id}`} key={product.id}>
          <div className="product-card">
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: {product.price}</p>
          </div>
        </Link>
      ))}
    
    </div>
    <div className="pagination">
        <button onClick={handleFirstPage} disabled={page === 1}>
          Beginning
        </button>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
        <button onClick={handleEndPage}>End</button>
      </div>
    </div>
  );
}

export default ProductList;
