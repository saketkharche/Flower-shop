import './Cart.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { addToCart, removeFromCart, cartAllItems } from '../../actions/cartActions';
import { checkout } from '../../actions/orderActions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart(props) {

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    // console.log(cartItems);

    let history = useHistory();
    const dispatch = useDispatch();


    const [ischeckout, setIscheckout] = useState(false);
    const [isShipping, setIsShipping] = useState(false);
    const [shipping, setShipping] = useState({ addressLine: '', city: '', pincode: '', state: '' })
    const [payment, setPayment] = useState('');
    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         dispatch(cartAllItems());
    //     }
    //     else {
    //         toast.info(`Login to access Cart`, {
    //             position: "top-right",
    //         })
    //         history.push('/login')
    //         //eslint-disable-next-line

    //     }
    // }, [])


    // useEffect(() => {

    // }, [])


    const handleShipping = (e) => {
        setShipping({ ...shipping, [e.target.name]: e.target.value })
    }

    const handleProceedToBuy = () => {
        setIscheckout(true);
        // dispatch(checkout())
    }

    const handleCheckout = (e) => {
        e.preventDefault();

        setIscheckout(false);
        setIsShipping(true);
    }

    const handlePayment = (e) => {
        e.preventDefault();
        // setPayment(e.target.value)
        
        setIsShipping(false);
        dispatch(checkout())
        toast.success(`Congratulations! Order placed Successfully`, {
            position: "top-right",
        })
    }


    const handleRemoveFromCartHandler = (prodId, quantity) => {
        dispatch(removeFromCart(prodId, quantity))
        toast.warn(`Item removed from Cart`, {
            position: "top-right",
        })
    }

    return (
        <div style={{ marginTop: "100px", fontSize: 'larger' }}>
            <div className="cart">
                <div className="cart-list">
                    <div className="cart-list-container">
                        <ul>
                            {!cartItems ?
                                (<div><b>Cart is Empty, Do some Shopping!!!</b></div>) :
                                (cartItems.items.map((item) => {
                                    return <li key={item.productId}>
                                        <div className="cart-image"><img src={`http://127.0.0.1:3000/${item.image}`} alt="item" /></div>
                                        <div className="cart-name">
                                            <div>
                                                <Link to={`/product/${item.productId}`}>{item.name}</Link></div>
                                            <div>
                                                QTY: {item.quantity}
                                                <div>
                                                    <select value={item.quantity} onChange={(e) => dispatch(addToCart(item.productId, e.target.value))}>
                                                    <option></option>
                                                        {item.countInStock > 0 ?
                                                            [...Array(item.countInStock).keys()].map(x =>
                                                                <option key={x + 1} value={x + 1}> {x + 1} </option>)
                                                            : 'out of Stock'}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                Price : {item.price}

                                            </div>
                                            <div>
                                                <i className="far fa-trash-alt" onClick={() => { handleRemoveFromCartHandler(item.productId, item.quantity) }}></i>
                                            </div>
                                        </div>
                                    </li>
                                })
                                )}
                        </ul>
                    </div>
                </div>
                <div className="cart-action">
                    {!cartItems ? '' : <>
                        <h3>
                            SubTotal ({cartItems && cartItems.items.length} items)
                            :
                            $ {cartItems && cartItems.bill}
                        </h3>
                        <button className="button primary" disabled={cartItems && cartItems.items.length === 0} onClick={handleProceedToBuy}>
                            Proceed to Buy
                        </button>
                    </>}

                </div>
            </div>
            <div>
                {ischeckout && <div className='ship-container'>
                    <h2 className="my-2">Shipping Information</h2>
                    <form className="my-2" onSubmit={handleCheckout}>
                        <div className="mb-3">
                            <label for="addressLine" className="form-label">Address Line</label>
                            <input type="text" className="form-control" id="addressLine" name="addressLine" value={shipping.addressLine} onChange={handleShipping} placeholder="Enter Address Line" />
                        </div>
                        <div className="mb-3">
                            <label for="city" className="form-label">City</label>
                            <input type="text" className="form-control" id="city" name="city" value={shipping.city} onChange={handleShipping} placeholder="Enter City" />
                        </div>
                        <div className="mb-3">
                            <label for="pincode" className="form-label">Pincode</label>
                            <input type="text" className="form-control" id="pincode" name="pincode" value={shipping.pincode} onChange={handleShipping} placeholder="Enter Pincode " />
                        </div>
                        <div className="mb-3">
                            <label for="state" className="form-label">State/Province</label>
                            <input type="text" className="form-control" id="state" name="state" value={shipping.state} onChange={handleShipping} placeholder="Enter State" />
                        </div>
                        <button type="submit" className="btn btn-info rounded-pill">Submit</button>
                    </form>
                </div>}
                {isShipping && <div className='ship-container'>
                    <h2 className="my-2">Payment Information</h2>
                    <form className="my-2" onSubmit={handlePayment}>
                        <div className="mb-3">
                            <label htmlFor="payment" className="form-label">UPI - Enter Your VPA address</label>
                            <input type="email" className="form-control" id="payment" name="payment" value={payment} onChange={ (e) => setPayment(e.target.value)} placeholder="989898998@ybl" />
                        </div>
                      
                        <button type="submit" className="btn btn-info rounded-pill">Done</button>
                    </form>
                </div>}
            </div>
         
        </div>

    )
}

export default Cart
