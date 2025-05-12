import "./Cart.css";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  addToCart,
  removeFromCart,
  cartAllItems,
} from "../../actions/cartActions";
import { checkout } from "../../actions/orderActions";
import { toast } from "react-toastify";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const history = useHistory();
  const dispatch = useDispatch();

  const [ischeckout, setIscheckout] = useState(false);
  const [isShipping, setIsShipping] = useState(false);
  const [shipping, setShipping] = useState({
    addressLine: "",
    city: "",
    pincode: "",
    state: "",
  });
  const [payment, setPayment] = useState("");
  const [errors, setErrors] = useState({});

  const validateShipping = () => {
    let valid = true;
    const newErrors = {};

    if (!/^[a-zA-Z0-9\s,.-]+$/.test(shipping.addressLine)) {
      newErrors.addressLine =
        "Invalid address. Only letters, numbers, spaces, commas, periods, and dashes are allowed.";
      valid = false;
    }

    if (!/^[a-zA-Z\s]+$/.test(shipping.city)) {
      newErrors.city = "City must contain only letters and spaces.";
      valid = false;
    }

    if (!/^\d{6}$/.test(shipping.pincode)) {
      newErrors.pincode = "Pincode must be exactly 6 digits.";
      valid = false;
    }

    if (!/^[a-zA-Z\s]+$/.test(shipping.state)) {
      newErrors.state = "State must contain only letters and spaces.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validatePayment = () => {
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiRegex.test(payment)) {
      setErrors({ payment: "Invalid UPI format. Example: username@bank" });
      return false;
    }
    return true;
  };

  const handleShipping = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleProceedToBuy = () => {
    setIscheckout(true);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setIscheckout(false);
      setIsShipping(true);
    } else {
      toast.error("Please fix the errors in the form", {
        position: "top-right",
      });
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (validatePayment()) {
      setIsShipping(false);
      dispatch(checkout());
      toast.success(`Congratulations! Order placed successfully`, {
        position: "top-right",
      });
    } else {
      toast.error("Please enter a valid UPI ID", {
        position: "top-right",
      });
    }
  };

  const handleRemoveFromCartHandler = (prodId, quantity) => {
    dispatch(removeFromCart(prodId, quantity));
    toast.warn(`Item removed from Cart`, {
      position: "top-right",
    });
  };

  return (
    <div style={{ marginTop: "100px", fontSize: "larger" }}>
      <div className="cart">
        <div className="cart-list">
          <div className="cart-list-container">
            <ul>
              {!cartItems ? (
                <div>
                  <b>Cart is Empty, Do some Shopping!!!</b>
                </div>
              ) : (
                cartItems.items.map((item) => (
                  <li key={item.productId}>
                    <div className="cart-image">
                      <img src={item.image} alt={item.image} />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={`/product/${item.productId}`}>
                          {item.name}
                        </Link>
                      </div>
                      <div>
                        QTY: {item.quantity}
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(addToCart(item.productId, e.target.value))
                          }
                        >
                          {item.countInStock > 0
                            ? [...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))
                            : "Out of Stock"}
                        </select>
                      </div>
                      <div>Price: {item.price}</div>
                      <div>
                        <i
                          className="far fa-trash-alt"
                          onClick={() => {
                            handleRemoveFromCartHandler(
                              item.productId,
                              item.quantity
                            );
                          }}
                        ></i>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="cart-action">
          {cartItems && (
            <>
              <h3>
                SubTotal ({cartItems.items.length} items) : ₹ {cartItems.bill}
              </h3>
              <button
                className="button primary"
                disabled={cartItems.items.length === 0}
                onClick={handleProceedToBuy}
              >
                Proceed to Buy
              </button>
            </>
          )}
        </div>
      </div>

      {/* Shipping Form */}
      {ischeckout && (
        <div className="ship-container">
          <h2 className="my-2">Shipping Information</h2>
          <form className="my-2" onSubmit={handleCheckout}>
            <div className="mb-3">
              <label htmlFor="addressLine" className="form-label">
                Address Line
              </label>
              <input
                type="text"
                className="form-control"
                id="addressLine"
                name="addressLine"
                value={shipping.addressLine}
                onChange={handleShipping}
                placeholder="Enter Address Line"
              />
              {errors.addressLine && (
                <div className="error">{errors.addressLine}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={shipping.city}
                onChange={handleShipping}
                placeholder="Enter City"
              />
              {errors.city && <div className="error">{errors.city}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="pincode" className="form-label">
                Pincode
              </label>
              <input
                type="text"
                className="form-control"
                id="pincode"
                name="pincode"
                value={shipping.pincode}
                onChange={handleShipping}
                placeholder="Enter Pincode"
              />
              {errors.pincode && (
                <div className="error">{errors.pincode}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={shipping.state}
                onChange={handleShipping}
                placeholder="Enter State"
              />
              {errors.state && <div className="error">{errors.state}</div>}
            </div>

            <button type="submit" className="btn btn-info rounded-pill">
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Payment Form */}
      {isShipping && (
        <div className="ship-container">
          <h2 className="my-2">Payment Information</h2>
          <form className="my-2" onSubmit={handlePaymentSubmit}>
            <div className="mb-3">
              <label htmlFor="payment" className="form-label">
                UPI - Enter Your VPA Address
              </label>
              <input
                type="text"
                className="form-control"
                id="payment"
                name="payment"
                value={payment}
                onChange={(e) => {
                  setPayment(e.target.value);
                  setErrors({ ...errors, payment: "" });
                }}
                placeholder="e.g., username@bank"
              />
              {errors.payment && (
                <div className="error">{errors.payment}</div>
              )}
            </div>
            <button type="submit" className="btn btn-info rounded-pill">
              Done
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Cart;
