import React from 'react';
import { Link } from 'react-router-dom';

const CategoryShowcase = ({ category, products }) => {
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    return price; // Return as is if it's not a number
  };

  return (
    <section className="category-showcase mt-5">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-auto">
            {/* <img 
              src={category.image} 
              alt={`${category.title} category`} 
              className="category-image"
              style={{ maxWidth: '100px', maxHeight: '50px', objectFit: 'contain' }}
            /> */}
          </div>
          <div className="col">
            <h3 className="mb-0">{category.title} Products</h3>
          </div>
          <div className="col-auto">
          See All
          </div>
        </div>
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card h-100">
                <img src={product.image} className="card-img-top" alt={product.title} style={{height: '200px', objectFit: 'contain'}} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">${formatPrice(product.price)}</p>
                  <Link to={`/product/${product.slug}`} className="btn btn-primary">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;