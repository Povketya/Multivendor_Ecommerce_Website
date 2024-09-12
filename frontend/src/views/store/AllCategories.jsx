import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiInstance from '../../utils/axios';

function AllCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiInstance.get('/category/')
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch categories');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Categories</h2>
      <div className="row">
        {categories.map(category => (
          <div key={category.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={category.image} className="card-img-top" alt={category.title} style={{height: '200px', objectFit: 'cover'}} />
              <div className="card-body">
                <h5 className="card-title">{category.title}</h5>
                <p className="card-text">Products: {category.product_count}</p>
                <Link to={`/category/${category.slug}`} className="btn btn-primary">View Products</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllCategories;