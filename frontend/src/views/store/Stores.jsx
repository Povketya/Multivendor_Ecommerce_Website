import React, { useState, useEffect } from "react";
import apiInstance from "../../utils/axios";
import { Link } from "react-router-dom";

function Stores() {
  const [vendors, setVendors] = useState([]);

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

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Stores</h2>
      <div className="row">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={vendor.image || "/path/to/placeholder.jpg"}
                className="card-img-top"
                alt={vendor.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{vendor.name}</h5>
                <p className="card-text">{vendor.description}</p>
                <Link to={`/store/${vendor.slug}`} className="btn btn-primary">
                  Visit Store
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stores;
