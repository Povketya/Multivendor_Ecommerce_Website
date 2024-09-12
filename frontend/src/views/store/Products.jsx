import React, { useState, useEffect } from "react";
import apiInstance from "../../utils/axios";
import { Link } from "react-router-dom";
import VendorShowcase from './VendorShowcase';
import CategoryShowcase from './CategoryShowcase';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [vendors, setVendors] = useState([]);
  const [highlightedShopProducts, setHighlightedShopProducts] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [msiProducts, setMsiProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  
  useEffect(() => {
    apiInstance
      .get("products/")
      .then((response) => {
        setProducts(response.data);
        console.log("Fetched products:", response.data); // Log to check data
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Fetch categories data from API
  useEffect(() => {
    apiInstance
      .get("category/")
      .then((response) => {
        setCategories(response.data);
        console.log("Fetched categories:", response.data); // Log to check data
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Fetch vendors data from API
  useEffect(() => {
    apiInstance
      .get("vendors/")
      .then((response) => {
        setVendors(response.data);
        console.log("Fetched vendors:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching vendors:", error);
      });
  }, []);

  useEffect(() => {
    apiInstance.get("products/?vendor=msi")
      .then((response) => {
        setMsiProducts(response.data.slice(0, 4)); // Get first 4 products
      })
      .catch((error) => {
        console.error("Error fetching MSI products:", error);
      });
  }, []);
  useEffect(() => {
    apiInstance.get("products/?category=laptops")
      .then((response) => {
        setCategoryProducts(response.data.slice(0, 4)); // Get first 4 products
      })
      .catch((error) => {
        console.error("Error fetching Laptop products:", error);
      });
  }, []);
  return (
    <>
      <main className="mt-5">
        <div className="container">
          {/* Categories Section */}
          <section className="categories-section mt-5">
            <h3 className="text-center mb-4">Available Brands</h3>
            <div className="row justify-content-center">
              {categories?.map((cat, index) => (
                <div className="col-lg-2 col-md-3 col-sm-4 mb-4" key={index}>
                  {/* <Link to={`/category/${cat.slug}/`} className="category-link"> */}
                  <div className="card category-box shadow-lg border-0 rounded text-center">
                    <div className="card-body d-flex justify-content-center align-items-center">
                      <img
                        src={cat.image}
                        className="category-image"
                        alt={cat.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/path/to/placeholder.jpg"; // Fallback image
                        }}
                      />
                    </div>
                    <h5 className="category-title">{cat.name}</h5>
                  </div>
                  {/* </Link> */}
                </div>
              ))}
            </div>
          </section>

          {/* Vendors Section */}
          <section className="categories-section mt-5">
            <h3 className="text-center mb-4">Partner Stores</h3>
            <div className="row justify-content-center">
              {vendors?.map((vendor, index) => (
                <div className="col-lg-2 col-md-3 col-sm-4 mb-4" key={index}>
                  <Link to={`/vendor/${vendor.slug}/`} className="vendor-link">
                    <div className="card vendor-box shadow-lg border-0 rounded text-center">
                      <div className="card-body d-flex justify-content-center align-items-center">
                        <img
                          src={vendor.image}
                          className="vendor-image"
                          alt={vendor.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/path/to/placeholder.jpg";
                          }}
                        />
                      </div>

                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
          {/* Add the VendorShowcase component here */}
        <VendorShowcase 
          vendor={{
            name: "Web_Store",
            // logo: "/path/to/msi-logo.png",
            slug: "Web_Store"
          }}
          products={msiProducts}
        />
        <CategoryShowcase 
          category={{
            title: "Acer",
            // image: "/path/to/laptop-category-image.png",
            slug: "ACER"
          }}
          products={categoryProducts}
        />

          {/* Products Section */}
          <section className="products-section mt-5">
            <h3 className="text-center mb-4">Lastest Products</h3>
            <div className="row justify-content-center">
              {products?.map((p, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                  <div
                    className="card product-box h-100 shadow-lg border-0 rounded"
                    style={{
                      transition: "transform 0.3s, box-shadow 0.3s",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      className="position-relative bg-image hover-zoom ripple"
                      data-mdb-ripple-color="light"
                    >
                      <Link to={`/detail/${p.slug}/`}>
                        <img
                          src={p.image}
                          className="product-image card-img-top"
                          alt={p.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/path/to/placeholder.jpg"; // Fallback image
                          }}
                        />
                      </Link>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-center align-items-center mb-2">
                        <span className="rating">★★★★☆</span>
                        <span className="text-muted ms-2">
                          ({p.reviewCount || 4} Reviews)
                        </span>
                      </div>
                      <h5
                        className="card-title text-center"
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "600",
                          color: "#333",
                        }}
                      >
                        {p.title}
                      </h5>
                      <div className="price-container text-center d-flex justify-content-center align-items-center">
                        <h6
                          className="text-danger"
                          style={{
                            fontSize: "1rem",
                            fontWeight: "500",
                            marginBottom: "0.2rem",
                            marginRight: "10px",
                          }}
                        >
                          <strike>${p.old_price}</strike>
                        </h6>
                        <h5
                          className="price"
                          style={{
                            fontSize: "1.4rem",
                            fontWeight: "700",
                            color: "#000",
                          }}
                        >
                          ${p.price}
                        </h5>
                      </div>
                      <p
                        className="product-description text-muted text-left flex-grow-1"
                        style={{
                          fontSize: "0.85rem",
                          marginTop: "10px",
                          lineHeight: "1.6",
                          textAlign: "left",
                          whiteSpace: "pre-wrap",
                          marginBottom: "8px", // Minimal space below the description
                        }}
                      >
                        {p.description.length > 300
                          ? `${p.description.substring(0, 300)}...`
                          : p.description}
                      </p>
                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <div className="mt-auto d-flex justify-content-between align-items-center">
                          <button className="btn btn-outline-primary">
                            <i>Click image</i>
                          </button>
                        </div>

                        {/* <button className="btn btn-outline-success">
                          <i className="fas fa-heart"></i> Favourite
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Inline CSS */}
      <style jsx>{`
        .product-box {
          background-color: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 15px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
          transition:
            transform 0.2s,
            box-shadow 0.2s;
          height: 100%;
        }

        .product-box:hover {
          transform: translateY(-25px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .product-image {
          height: 150px;
          object-fit: cover;
          border-radius: 8px;
        }

        .price-container {
          margin-top: 10px;
        }

        .price {
          font-size: 1.4rem;
          font-weight: bold;
          color: #000;
        }

        .product-description {
          font-size: 0.85rem;
          color: #666;
          margin-top: 10px;
        }

        .btn-outline-primary {
          border: 1px solid #007bff;
          color: #007bff;
          border-radius: 5px;
        }

        .btn-outline-primary:hover {
          background-color: #007bff;
          color: #fff;
        }

        .btn-outline-success {
          border: 1px solid #28a745;
          color: #28a745;
          border-radius: 5px;
        }

        .btn-outline-success:hover {
          background-color: #28a745;
          color: #fff;
        }

        .rating {
          font-size: 1rem;
          color: #ffa500;
        }

        .category-box {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
          height: 180px; /*
  /* Set the width to ensure uniform size */
        }

        .category-box:hover {
          transform: translateY(-15px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        .category-title {
          font-size: 1.1rem;
          color: #333;
          font-weight: 600;
          margin-top: 10px;
        }

        .category-link {
          text-decoration: none;
          color: inherit;
        }

        .category-image {
          max-height: 100px;
          max-width: 100px;
          object-fit: contain;
          border-radius: 50%; /* Makes the image circular */
        }

.vendor-box {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
          transition: transform 0.2s, box-shadow 0.2s;
          height: 180px;
          width: 180px;
        }

        .vendor-box:hover {
          transform: translateY(-15px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        .vendor-title {
          font-size: 1.1rem;
          color: #333;
          font-weight: 600;
          margin-top: 10px;
        }

        .vendor-link {
          text-decoration: none;
          color: inherit;
        }

        .vendor-image {
          max-height: 100px;
          max-width: 100px;
          object-fit: contain;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
}

export default Products;
