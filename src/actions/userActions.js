import Axios from "axios";
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, 
  USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL,
  USER_ORDER_REQUEST, USER_ORDER_SUCCESS, USER_ORDER_FAIL
} from "../constants/userConstants";

// const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
//   const { userSignin: { userInfo } } = getState();
//   dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
//   try {
//     const { data } = await Axios.put("/api/users/" + userId,
//       { name, email, password }, {
//       headers: {
//         Authorization: 'Bearer ' + userInfo.token
//       }
//     });
//     dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
//     Cookie.set('userInfo', JSON.stringify(data));
//   } catch (error) {
//     dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
//   }
// }

const host = "http://127.0.0.1:8080"
const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(`${host}/auth/login`, { email, password });
    
    // console.log(data.authtoken);
    localStorage.setItem('token', data.authtoken);
    // console.log(localStorage.getItem('token'))
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    // localStorage.setItem('token', data);
    
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
}


const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post(`${host}/auth/register`, { name, email, password });
    console.log(data);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    // Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}


const userDetail = ()=> async(dispatch) =>{
  dispatch({type:USER_DETAIL_REQUEST, payload:{}});
  try {

    const headers = {
      'Content-Type':'application/json',
      'auth-token':`${localStorage.getItem('token')}`
    }

    const response = await fetch("http://localhost:8080/auth/user",
    {
    method:'POST',
    headers: headers,
  });
    const user = await response.json();
    dispatch({type:USER_DETAIL_SUCCESS, payload: user});
   

  } catch (error) {
    dispatch({ type: USER_DETAIL_FAIL, payload: error.message });
  }
}


const userOrder = ()=> async(dispatch) =>{
  dispatch({type:USER_ORDER_REQUEST, payload:{}});
  try {

    const headers = {
      'Content-Type':'application/json',
      'auth-token':`${localStorage.getItem('token')}`
    }
    const response = await fetch("http://localhost:8080/order/orders",
    {
    method:'POST',
    headers: headers,
  });
    const orders = await response.json();
    
    // console.log(orders.orders);
    dispatch({type:USER_ORDER_SUCCESS, payload: orders.orders});
   

  } catch (error) {
    dispatch({ type: USER_ORDER_FAIL, payload: error.message });
  }
}


const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: USER_LOGOUT })
}
export { login, logout, register, userDetail, userOrder };