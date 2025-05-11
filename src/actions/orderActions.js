import {
    CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAIL
} from '../constants/orderConstants';

const checkout = () => async (dispatch) => {
    try {
        dispatch({ type: CHECKOUT_REQUEST });
        const headers = {
          'Content-Type':'application/json',
          'auth-token':`${localStorage.getItem('token')}`
        }
    
        const response = await fetch("http://localhost:8080/order/checkout",
        {
        method:'POST',
        headers: headers,
      });
        const orderconfirm = await response.json();
        dispatch({ type: CHECKOUT_SUCCESS, payload: orderconfirm });
    } catch (error) {
        dispatch({ type: CHECKOUT_FAIL, payload: error.message });
    }
};

export {checkout}