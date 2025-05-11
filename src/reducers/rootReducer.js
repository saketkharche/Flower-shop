import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { productListReducer, productDetailsReducer} from './productReducer';
import {userSigninReducer, userRegisterReducer,
    userDetailReducer, userOrderReducer} from './userReducer';


export default combineReducers({
    productList: productListReducer,
    productDetails:productDetailsReducer,
    cart: cartReducer,
    userSignin:userSigninReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetailReducer,
    userOrders:userOrderReducer

});