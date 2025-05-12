import "./ProductDetail.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { detailsProduct } from "../../actions/productActions";
import { addToCart } from "../../actions/cartActions";
import { toast } from "react-toastify";

export default function ProductDetail(props) {
  const [qty, setQty] = useState(1);

  //Getting the product id
  const id = useParams();
  const prodId = id.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(prodId));
    // eslint-disable-next-line
  }, [dispatch, prodId]);

  let history = useHistory();
  const handleAddToCart = () => {
    if (prodId) {
      dispatch(addToCart(prodId, qty));
      if (localStorage.getItem("token")) {
        toast.success(`Item Added to Cart!`, {
          position: "top-right",
        });
      }
      history.push("/cart");
    }
  };

  return (
    <>
      <div style={{ marginTop: "100px" }}>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error</div>
        ) : (
          <div>
            <div className="back-to-result">
              <Link to="/products">Back to Products</Link>
            </div>
            <div className="details">
              <div className="details-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="details-info">
                <ul>
                  <li>
                    <h4>{product.name}</h4>
                  </li>
                  <li>({product.numReviews} Reviews)</li>
                  <li>
                    Price : <b>₹{product.price}</b>
                  </li>
                  <li>
                    Description:
                    <div>{product.description}</div>
                  </li>
                </ul>
              </div>
              <div className="details-action">
                <ul>
                  <li>Price : {product.price}</li>
                  <li>
                    Status:{" "}
                    {product.countInStock > 0 ? "Available" : "Out of Stock"}
                  </li>
                  <li>
                    QTY:
                    <select
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.value);
                      }}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {" "}
                          {x + 1}{" "}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li>
                    <button
                      disabled={product.countInStock < 1}
                      onClick={handleAddToCart}
                      className="bttn"
                    >
                      Add To Cart
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
