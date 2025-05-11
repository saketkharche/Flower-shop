import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_FILTER_REQUEST,
    PRODUCT_FILTER_SUCCESS,
    PRODUCT_FILTER_FAIL,
    PRODUCT_SEARCH_REQUEST,
    PRODUCT_SEARCH_SUCCESS,
    PRODUCT_SEARCH_FAIL

} from '../constants/productConstants';
import axios from 'axios';
const host = "http://127.0.0.1:8080"


const listProducts = () => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(`${host}/products/allproducts`);

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
};

const filterProducts = (measure) => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_FILTER_REQUEST });
        const { data } = await axios.get(`${host}/products/filterproducts/${measure}`);
        console.log(data)
        dispatch({ type: PRODUCT_FILTER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_FILTER_FAIL, payload: error.message });
    }
};

const searchProducts = (measure) => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_SEARCH_REQUEST });
        console.log(measure);
        const { data } = await axios.get(`${host}/products/searchProducts/${measure}`);
        console.log(data)
        dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_SEARCH_FAIL, payload: error.message });
    }
};

const detailsProduct = (productId) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
      const { data } = await axios.get('http://127.0.0.1:8080/products/' + productId);
      // console.log(data)
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data});
    } catch (error) {
      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
    }
};


export {
    listProducts,
    detailsProduct,
    filterProducts,
    searchProducts
};
