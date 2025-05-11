// import { GET_ORDERS, CHECKOUT, ORDERS_LOADING } from '../actions/types';

// const initialState = {
//     orders: [],
//     loading: false
// }

// export default function(state=initialState, action){
//     switch(action.type){
//         case GET_ORDERS:
//             return{
//                 ...state,
//                 orders: action.payload,
//                 loading: false
//             }

//         case CHECKOUT:
//             return{
//                 ...state,
//                 orders: [action.payload, ...state.orders]
//             }

//         case ORDERS_LOADING:
//             return{
//                 ...state,
//                 loading: true
//             }

//         default:
//             return state;
//     }
// }

import {
    CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAIL
} from '../constants/orderConstants';

function checkoutReducer(state = {}, action) {
    switch (action.type) {
      case CHECKOUT_REQUEST:
        return { loading: true, isLoggedIn:false };
      case CHECKOUT_SUCCESS:
        return { loading: false, orderconfirm: action.payload };
      case CHECKOUT_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  export {
    checkoutReducer
  }