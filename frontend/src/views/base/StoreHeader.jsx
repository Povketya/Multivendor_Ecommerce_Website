import React, { useContext, useState, useEffect } from "react";
import { useAuthStore } from "../../store/auth";
import { Link } from "react-router-dom";
import apiInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";

function StoreHeader() {
  const [search, setSearch] = useState("");

  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/search?query=${search}`);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
          PETER TECH
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/stores">
                  All Stores
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  All Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/categories">
                  All Categories
                </Link>
              </li>
            </ul>

            <div className="d-flex">
              <input
                onChange={handleSearchChange}
                name="search"
                className="form-control me-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                onClick={handleSearchSubmit}
                className="btn btn-outline-success me-2"
                type="submit"
              >
                Search
              </button>
            </div>
            {isLoggedIn() ? (
              <>
                <Link
                  className="btn btn-primary me-2"
                  to={"/customer/account/"}
                >
                  Account
                </Link>
                <Link className="btn btn-primary me-2" to="/logout">
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="btn btn-primary me-2" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary me-2" to="/register">
                  Register
                </Link>
              </>
            )}
            <Link className="btn btn-danger" to="/cart/">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </div>
        </div>
      </nav>

      {/* Add padding to prevent content overlap with the fixed navbar */}
      <div style={{ paddingTop: "56px" }}></div>

      {/* Custom CSS */}
      <style jsx>{`
        .bg-dark {
          background-color: #343a40; /* Dark background color */
        }

        .navbar-dark .navbar-nav .nav-link {
          color: #fff; /* White text color for links */
        }

        .navbar-dark .navbar-brand {
          color: #fff; /* White text color for brand */
        }

        .navbar-dark .nav-link:hover {
          color: #ddd; /* Lighter color on hover */
        }
      `}</style>
    </div>
  );
}

export default StoreHeader;