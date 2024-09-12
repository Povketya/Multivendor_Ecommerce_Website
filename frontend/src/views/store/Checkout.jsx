import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiInstance from "../../utils/axios";
import { BASE_URL } from "../../utils/constants";

function Checkout() {
  const [order, setOrder] = useState({});
  const [paymentLoading, setPaymentLoading] = useState(false);

  const axios = apiInstance;
  const param = useParams();

  useEffect(() => {
    axios.get(`checkout/${param?.order_oid}/`).then((res) => {
      setOrder(res.data);
    });
  }, [param.order_oid]);

  const payWithStripe = (event) => {
    setPaymentLoading(true);
    event.target.form.submit();
  };

  return (
    <div>
      <main className="mb-4 mt-4">
        <div className="container">
          <section className="shadow-4 p-4 rounded-5 mb-4">
            {/* <h5 className="mb-3">Cart Summary</h5> */}
            {/* <div className="d-flex justify-content-between mb-3">
              <span>Subtotal</span>
              <span>${order.sub_total}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Shipping</span>
              <span>${order.shipping_amount}</span>
            </div> */}
            {/* <div className="d-flex justify-content-between">
              <span>Total</span>
              <span>${order.total}</span>
            </div> */}

            {paymentLoading ? (
              <form
                action={`${API_BASE_URL}stripe-checkout/${param?.order_oid}/`}
                method="POST"
              >
                <button
                  onClick={payWithStripe}
                  type="submit"
                  className="btn btn-primary btn-rounded w-100 mt-2"
                >
                  Processing... <i className="fas fa-spinner fa-spin"></i>
                </button>
              </form>
            ) : (
              <form
                action={`${BASE_URL}stripe-checkout/${param?.order_oid}/`}
                method="POST"
              >
                <button
                  onClick={payWithStripe}
                  type="submit"
                  className="btn btn-primary btn-rounded w-100 mt-2"
                >
                  Thank you for your order!
                </button>
              </form>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Checkout;
