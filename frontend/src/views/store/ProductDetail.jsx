import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserData from "../plugin/UserData";
import CardID from "../plugin/CartID";

import apiInstance from "../../utils/axios";

import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [specifications, setSpecifications] = useState([]);
  const [gallery, setGallery] = useState([]);
  // const [color, setColor] = useState([]);
  // const [colorValue, setColorValue] = useState("No Color");
  const [qtyValue, setQtyValue] = useState(1);

  const param = useParams();
  const userData = UserData();
  const cardID = CardID(); // Change this to cardID to be consistent

  useEffect(() => {
    apiInstance.get(`products/${param.slug}/`).then((res) => {
      setProduct(res.data);
      setSpecifications(res.data.specification);
      setGallery(res.data.gallery);
      // setColor(res.data.color);
    });
  }, []);

  const handleQuantityChange = (event) => {
    setQtyValue(event.target.value);
  };

  const handleAddToCart = async () => {
    try {
      const formdata = new FormData();

      formdata.append("product_id", product.id);
      formdata.append("user_id", userData?.user_id);
      formdata.append("qty", qtyValue);
      formdata.append("price", product.price);
      // formdata.append("shipping_amount", product.shipping_amount);
      // formdata.append("country", currentAddress.country);
      // formdata.append("size", sizeValue);
      // formdata.append("color", colorValue);
      formdata.append("cart_id", cardID); // Use cardID here

      // Log form data to inspect what is being sent
      console.log([...formdata.entries()]);

      const response = await apiInstance.post("cart-view/", formdata);
      console.log(response.data);

      // Show success toast notification
      Toast.fire({
        icon: "success",
        title: response.data.message,
      });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <main className="mb-4 mt-4">
      <div className="container">
        {/* Section: Product details */}
        <section className="mb-9">
          <div className="row gx-lg-5">
            <div className="col-md-6 mb-4 mb-md-0">
              {/* Gallery */}
              <div className="">
                <div className="row gx-2 gx-lg-3">
                  <div className="col-12 col-lg-12">
                    <div className="lightbox">
                      <img
                        src={product.image}
                        style={{
                          width: "100%",
                          height: 500,
                          objectFit: "cover",
                          borderRadius: 10,
                        }}
                        alt="Gallery image 1"
                        className="ecommerce-gallery-main-img active w-100 rounded-4"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-3 d-flex">
                  {gallery.map((g, index) => (
                    <div className="p-3" key={index}>
                      <img
                        src={g.image}
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                          borderRadius: 10,
                        }}
                        alt="Gallery image 1"
                        className="ecommerce-gallery-main-img active w-100 rounded-4"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Gallery */}
            </div>
            <div className="col-md-6 mb-4 mb-md-0">
              {/* Details */}
              <div>
                <h1 className="fw-bold mb-3">{product.title}</h1>
                <div className="d-flex text-primary just align-items-center">
                  <ul className="mb-3 d-flex p-0" style={{ listStyle: "none" }}>
                    <li>
                      <i
                        className="fas fa-star fa-sm text-warning ps-0"
                        title="Bad"
                      />
                      <i
                        className="fas fa-star fa-sm text-warning ps-0"
                        title="Bad"
                      />
                      <i
                        className="fas fa-star fa-sm text-warning ps-0"
                        title="Bad"
                      />
                      <i
                        className="fas fa-star fa-sm text-warning ps-0"
                        title="Bad"
                      />
                      <i
                        className="fas fa-star fa-sm text-warning ps-0"
                        title="Bad"
                      />
                    </li>

                    <li style={{ marginLeft: 10, fontSize: 13 }}>
                      <a href="" className="text-decoration-none">
                        <strong className="me-2">4/5</strong>(2 reviews)
                      </a>
                    </li>
                  </ul>
                </div>
                <h5 className="mb-3">
                  <s className="text-muted me-2 small align-middle">
                    {product.old_price}
                  </s>
                  <span className="align-middle">{product.price}</span>
                </h5>
                <p className="text-muted">{product.description}</p>
                <div className="table-responsive">
                  <table className="table table-sm table-borderless mb-0">
                    <tbody>
                      <tr>
                        <th className="ps-0 w-25" scope="row">
                          <strong>Category</strong>
                        </th>
                        <td>{product.category?.title}</td>
                      </tr>
                      {specifications.map((s, index) => (
                        <tr key={index}>
                          <th className="ps-0 w-25" scope="row">
                            <strong>{s.title}</strong>
                          </th>
                          <td>{s.content}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <hr className="my-5" />
                <form action="">
                  <div className="row flex-column">
                    {/* Quantity */}
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="typeNumber">
                          <b>Quantity</b>
                        </label>
                        <input
                          type="number"
                          id="typeNumber"
                          className="form-control quantity"
                          min={1}
                          value={qtyValue}
                          onChange={handleQuantityChange}
                        />
                      </div>
                    </div>

                    {/* Size */}
                    {/* <div className="col-md-6 mb-4">
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="typeNumber"><b>Size:</b> XS</label>
                                    </div>
                                    <div className='d-flex'>
                                        <div key={1} className='me-2'>
                                            <input type="hidden" className='size_name' value={"XS"} />
                                            <button className='btn btn-secondary size_button'>XS</button>
                                        </div>
                                        <div key={1} className='me-2'>
                                            <input type="hidden" className='size_name' value={"XXL"} />
                                            <button className='btn btn-secondary size_button'>XXL</button>
                                        </div>
                                        <div key={1} className='me-2'>
                                            <input type="hidden" className='size_name' value={"XL"} />
                                            <button className='btn btn-secondary size_button'>XL</button>
                                        </div>
                                    </div>
                                </div> */}

                    {/* Colors */}

                    {/* <div className="col-md-6 mb-4">
                      <h6>
                        Color: <span>{colorValue}</span>
                      </h6>
                      <div className="">
                        {color?.map((c, index) => (
                          <div key={index}>
                            <input
                              type="text"
                              className="color_name"
                              value={c.name}
                              name=""
                              id=""
                            />
                            <button
                              className="btn p-3 m-1 color_button"
                              type="button"
                              onClick={handleColorButtonClick}
                              style={{ backgroundColor: '${c.color_code}' }}
                            >
                            
                            </button>
                          </div>
                        ))}
                      </div>
                    </div> */}
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-rounded me-2"
                    onClick={handleAddToCart}
                  >
                    <i className="fas fa-cart-plus me-2" /> Add to cart
                  </button>
                  {/* <button
                    href="#!"
                    type="button"
                    className="btn btn-danger btn-floating"
                    data-mdb-toggle="tooltip"
                    title="Add to wishlist"
                  >
                    <i className="fas fa-heart" />
                  </button> */}
                </form>
              </div>
            </div>
          </div>
        </section>
        <hr />

      </div>
    </main>
  );
}

export default ProductDetail;
