// import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CART_LOADING } from '../actions/types';

// const initialState = {
//     cart: null,
//     loading: false
// }

// export default function(state=initialState, action){
//     switch(action.type){
//         case GET_CART:
//             return {
//                 ...state,
//                 cart: action.payload,
//                 loading: false
//             }

//         case ADD_TO_CART:
//             return {
//                 ...state,
//                 cart: action.payload
//             }

//         case DELETE_FROM_CART:
//             return {
//                 ...state,
//                 cart: action.payload
//             }

//         case CART_LOADING:
//             return {
//                 ...state, 
//                 loading: true
//             }

//         default:
//             return state;
//     }
// }


import { CART_ALL_ITEM, CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

function cartReducer(state = {} , action) {
  switch (action.type) {
    case CART_ALL_ITEM:
      return {...state, cartItems:action.payload}
    case CART_ADD_ITEM:
      return{ ...state,
         cartItems: action.payload}
      // const item = action.payload;
      // const product = state.cartItems.find(x => x.product === item.product);
      // if (product) {
      //   return {
      //       loading:false,
      //     cartItems:
      //       state.cartItems.map(x => x.product === product.product ? item : x)
      //   };
      // }
      // return { loading:false, cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM:
      return { ...state,
        cartItems: action.payload };
    // case CART_SAVE_SHIPPING:
    //   return { ...state, shipping: action.payload };
    // case CART_SAVE_PAYMENT:
    //   return { ...state, payment: action.payload };
    default:
      return state
  }
}

export { cartReducer }