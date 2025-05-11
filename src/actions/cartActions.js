import Axios from "axios";

import { CART_ALL_ITEM, CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants";

const host = "http://127.0.0.1:8080"

const cartAllItems = () => async (dispatch) => {

  try {
    const { data } = await Axios.get(`${host}/cart/allcartitems`,
    {
      headers:{
        'Content-Type':'application/json',
      'auth-token':`${localStorage.getItem('token')}`
      }
    });
    console.log(data)
    dispatch({ type: CART_ALL_ITEM, payload: data });
    // console.log(data.authtoken);
    // localStorage.setItem('token', data.authtoken);
    // console.log(localStorage.getItem('token'))
    // dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    // Cookies.set('userInfo', JSON.stringify(data));
    // localStorage.setItem('token', data);
  }
  // try {
  //   const { data } = await axios.get('http://127.0.0.1:8080/products/' + productId);

  //   dispatch({
  //     type: CART_ADD_ITEM, payload: {
  //       product: data._id,
  //       name: data.name,
  //       image: data.image,
  //       price: data.price,
  //       countInStock: data.countInStock,
  //       qty
  //     }
  //   });
  //   // const { cart: { cartItems } } = getState();
  //   // Cookie.set("cartItems", JSON.stringify(cartItems));

  catch (error) {
    console.log(error.message);
  }
}


const addToCart = (productId, quantity) => async (dispatch, getState) => {

  try {
 
    const { data } = await Axios.post(`${host}/cart/additem`, { productId, quantity }
    ,{
      headers:{
        'Content-Type':'application/json',
      'auth-token':`${localStorage.getItem('token')}`
      }
    });
    dispatch({ type: CART_ADD_ITEM, payload: data });
    // console.log(data.authtoken);
    // localStorage.setItem('token', data.authtoken);
    // console.log(localStorage.getItem('token'))
    // dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    // Cookies.set('userInfo', JSON.stringify(data));
    // localStorage.setItem('token', data);
  }
  // try {
  //   const { data } = await axios.get('http://127.0.0.1:8080/products/' + productId);

  //   dispatch({
  //     type: CART_ADD_ITEM, payload: {
  //       product: data._id,
  //       name: data.name,
  //       image: data.image,
  //       price: data.price,
  //       countInStock: data.countInStock,
  //       qty
  //     }
  //   });
  //   // const { cart: { cartItems } } = getState();
  //   // Cookie.set("cartItems", JSON.stringify(cartItems));

  catch (error) {
    console.log(error.message);
  }
}
const removeFromCart = (productId, quantity) => async(dispatch) => {

  const headers = {
    'Content-Type':'application/json',
    'auth-token':`${localStorage.getItem('token')}`
  }
  const response = await fetch("http://localhost:8080/cart/deleteitem",
  {
  method:'DELETE',
  headers: headers,
  body:JSON.stringify({productId : productId,quantity: quantity})
});
  
  const data = await response.json();
  // const { data } = await Axios.delete(`${host}/cart/deleteitem`,
  // {productId, quantity},
  // {
  //   headers:{
  //     'Content-Type':'application/json',
  //   'auth-token':`${localStorage.getItem('token')}`
  //   }
  // });
  dispatch({ type: CART_REMOVE_ITEM, payload: data });

//   const { cart: { cartItems } } = getState();
//   Cookie.set("cartItems", JSON.stringify(cartItems));
}

export { cartAllItems, addToCart, removeFromCart }