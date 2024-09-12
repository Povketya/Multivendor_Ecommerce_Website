import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import apiInstance from "../../utils/axios";
import UserData from "../plugin/UserData";
import CartID from "../plugin/CartID";

function Cart() {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState({});
  const [productQuantities, setProductQuantities] = useState({});

  const userData = UserData();
  const cart_id = CartID();
  const navigate = useNavigate();

  const fetchCartData = (cartId, userId) => {
    const url = userId
      ? `cart-list/${cartId}/${userId}/`
      : `cart-list/${cartId}/`;

    apiInstance.get(url).then((res) => {
      setCart(res.data);
      const initialQuantities = {};
      res.data.forEach((item) => {
        initialQuantities[item.product.id] = item.qty;
      });
      setProductQuantities(initialQuantities);
    });
  };

  const fetchCartTotal = (cartId, userId) => {
    const url = userId
      ? `cart-detail/${cartId}/${userId}/`
      : `cart-detail/${cartId}/`;
    apiInstance.get(url).then((res) => {
      setCartTotal(res.data);
    });
  };

  useEffect(() => {
    console.log(cartTotal);
}, [cartTotal]);

if (cart_id !== null || cart_id !== undefined) {
    if (userData !== undefined) {
        useEffect(() => {
            fetchCartData(cart_id, userData.user_id);
            fetchCartTotal(cart_id, userData.user_id);
        }, []);
    } else {
        useEffect(() => {
            fetchCartData(cart_id, null);
            fetchCartTotal(cart_id, null);
        }, []);
    }
} else {
    window.location.href("/");
}


useEffect(() => {
    const initialQuantities = {};
    cart.forEach((c) => {
        initialQuantities[c.product.id] = c.qty
    });
    setProductQuantities(initialQuantities);
}, productQuantities);


  const handleQtyChange = (event, productId) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      setProductQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: newQuantity,
      }));
    }
  };

  const updateCart = async (cart_id, item_id, product_id, price) => {
    const qtyValue = productQuantities[product_id];

    try {
      const response = await apiInstance.put(`cart-update/${cart_id}/${item_id}/`, {
        product: product_id,
        qty: qtyValue,
        price: price,
        user: userData?.user_id || null,
      });

      if (response.status === 200) {
        fetchCartData(cart_id, userData?.user_id);
        fetchCartTotal(cart_id, userData?.user_id);
        Swal.fire({
          icon: 'success',
          title: 'Cart Updated',
          text: 'Your cart has been successfully updated.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'There was an error updating your cart. Please try again.',
      });
    }
  };

  const handleDeleteClick = async (cartId, itemId) => {
    try {
      const url = userData?.user_id
        ? `cart-delete/${cartId}/${itemId}/${userData.user_id}/`
        : `cart-delete/${cartId}/${itemId}/`;

      const response = await apiInstance.delete(url);

      if (response.status === 204) {
        fetchCartData(cart_id, userData?.user_id);
        fetchCartTotal(cart_id, userData?.user_id);

        Swal.fire({
          icon: 'success',
          title: 'Item Removed',
          text: 'The item has been removed from your cart.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      Swal.fire({
        icon: 'error',
        title: 'Deletion Failed',
        text: 'There was an error removing the item from your cart. Please try again.',
      });
    }
  };

  return (
    <div>
      <main className="mt-5">
        <div className="container">
          <main className="mb-6">
            <div className="container">
              <section className="">
                <div className="row gx-lg-5 mb-5">
                  <div className="col-lg-8 mb-4 mb-md-0">
                    <section className="mb-5">
                      {cart.map((c, index) => (
                        <div className="row border-bottom mb-4" key={index}>
                          <div className="col-md-2 mb-4 mb-md-0">
                            <div
                              className="bg-image ripple rounded-5 mb-4 overflow-hidden d-block"
                              data-ripple-color="light"
                            >
                              <Link to={`/detail/${c?.product?.slug}`}>
                                <img
                                  src={c?.product?.image}
                                  className="w-100"
                                  alt=""
                                  style={{
                                    height: "100px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                />
                              </Link>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4 mb-md-0">
                            <Link
                              to={`/detail/${c.product.slug}`}
                              className="fw-bold text-dark mb-4"
                            >
                              {c?.product?.title}
                            </Link>
                            <p className="mb-0">
                              <span className="text-muted me-2">Price:</span>
                              <span>${c.product.price}</span>
                            </p>
                            <p className="mb-0">
                              <span className="text-muted me-2">Vendor:</span>
                              <span>{c.product.vendor.name}</span>
                            </p>
                          </div>
                          <div className="col-md-4 mb-4 mb-md-0">
                            <div className="d-flex justify-content-center align-items-center mb-3">
                              <div className="form-outline me-2" style={{width: "60px"}}>
                                <input
                                  type="number"
                                  id={`qtyInput-${c.product.id}`}
                                  className="form-control"
                                  onChange={(e) => handleQtyChange(e, c.product.id)}
                                  value={productQuantities[c.product.id] || c.qty}
                                  min={1}
                                />
                              </div>
                              <button
                                onClick={() => updateCart(cart_id, c.id, c.product.id, c.product.price)}
                                className="btn btn-primary btn-sm"
                              >
                                <i className="fas fa-sync-alt"></i>
                              </button>
                            </div>
                            <h5 className="mb-3 text-center">
                              <span className="align-middle">
                                ${(c.product.price * (productQuantities[c.product.id] || c.qty)).toFixed(2)}
                              </span>
                            </h5>
                            <div className="text-center">
                              <button
                                onClick={() => handleDeleteClick(cart_id, c.id)}
                                className="btn btn-danger btn-sm"
                              >
                                <i className="fas fa-trash me-2"></i>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {cart.length === 0 && (
                        <div className="text-center py-5">
                          <h5>Your Cart Is Empty</h5>
                          <Link to="/" className="btn btn-primary mt-3">
                            <i className="fas fa-shopping-cart me-2"></i>
                            Continue Shopping
                          </Link>
                        </div>
                      )}
                    </section>
                  </div>
                  {cart.length > 0 && (
                    <div className="col-lg-4 mb-4 mb-md-0">
                      <section className="shadow-4 p-4 rounded-5 mb-4">
                        {/* <h5 className="mb-3">Cart Summary</h5>
                        <div className="d-flex justify-content-between mb-3">
                          <span>Subtotal </span>
                          <span>${cartTotal.sub_total?.toFixed(2)}</span>
                        </div> */}
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between fw-bold mb-5">
                          <span>Total </span>
                          <span>${cartTotal.total?.toFixed(2)}</span>
                        </div>
                        <button
                          onClick={() => navigate('/checkout')}
                          className="btn btn-primary btn-rounded w-100"
                        >
                          Proceed to Checkout
                        </button>
                      </section>
                    </div>
                  )}
                </div>
              </section>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
}

export default Cart;