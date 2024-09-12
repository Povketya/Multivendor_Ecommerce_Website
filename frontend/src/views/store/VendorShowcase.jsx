import React from 'react';
import { Link } from 'react-router-dom';

const VendorShowcase = ({ vendor, products }) => {
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    return price; // Return as is if it's not a number
  };

  return (
    <section className="vendor-showcase mt-5">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-auto">
            {/* <img 
            //   src={vendor.logo} 
              alt={`${vendor.name} logo`} 
              className="vendor-logo"
              style={{ maxWidth: '100px', maxHeight: '50px' }}
            /> */}
          </div>
          <div className="col">
            <h3 className="mb-0">{vendor.name} Products</h3>
          </div>
          <div className="col-auto">
            {/* <Link to={`/vendor/${vendor.slug}`}  */}
            See All
            {/* </Link> */}
          </div>
        </div>
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-md-3 mb-4">
              <div className="card h-100">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
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

export default VendorShowcase;