import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure you have axios or your API instance

function LatestProducts() {
  const [products, setProducts] = useState([]);

  // Fetch the latest products from the API
  useEffect(() => {


    apiInstance
      .get('products/')
      .then((response) => {
        const allProducts = response.data;
        // Assuming products are returned in order from newest to oldest
        const latestProducts = allProducts.slice(0, 4); // Get only the first 8 products
        setProducts(latestProducts);
        console.log("Fetched products:", latestProducts); // Log to check data
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <section>
      <h2>Latest Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LatestProducts;
