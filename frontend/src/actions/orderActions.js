import axios from 'axios';
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from '../constants/orderConstants';

import { CART_CLEAR_ITEMS } from '../constants/cartConstants';

// Define the API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Main order creation action
export const createOrder = order => async (dispatch, getState) => {
  let config;
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const orderData = {
      ...order,
      itemsPrice: Number(order.itemsPrice),
      shippingPrice: Number(order.shippingPrice),
      taxPrice: Number(order.taxPrice),
      totalPrice: Number(order.totalPrice),
      orderItems: order.orderItems.map(item => {
        // Extract just the relative path portion of the image URL
        let relativePath;
        try {
          const imageUrl = new URL(item.image, window.location.origin);
          let pathname = imageUrl.pathname;

          // Remove duplicate media/ if it exists
          pathname = pathname.replace(/^\/media\/media\//, '/media/');

          // Get the final path without leading /media/
          relativePath = pathname.replace(/^\/media\//, '');

          console.log('ORDER ACTIONS Image Path Processing:', {
            original: item.image,
            pathname,
            relativePath,
          });
        } catch (e) {
          // If URL parsing fails, handle as relative path
          relativePath = item.image
            .replace(/^media\/media\//, '')
            .replace(/^media\//, '');
          console.log('ORDER ACTIONS Fallback Path Processing:', {
            original: item.image,
            relativePath,
          });
        }

        console.log('Processing order item:', {
          name: item.name,
          image: relativePath,
          price: Number(item.price),
          qty: Number(item.qty),
          product: item.product,
        });

        return {
          product: item.product,
          name: item.name,
          qty: Number(item.qty),
          price: Number(item.price),
          image: relativePath,
        };
      }),
    };

    config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    console.log('Sending complete order data:', {
      orderItems: orderData.orderItems.map(item => ({
        ...item,
        price: typeof item.price,
        qty: typeof item.qty,
      })),
      pricing: {
        items: typeof orderData.itemsPrice,
        shipping: typeof orderData.shippingPrice,
        tax: typeof orderData.taxPrice,
        total: typeof orderData.totalPrice,
      },
    });

    const { data } = await axios.post(
      `${API_URL}orders/add/`,
      orderData,
      config
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CART_CLEAR_ITEMS,
    });

    localStorage.removeItem('cartItems');
  } catch (error) {
    console.error('Order creation failed:', {
      error: error.response?.data || error.message,
      statusCode: error.response?.status,
      orderData: order,
      requestConfig: config,
    });

    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

// Action to get details of a specific order
export const getOrderDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API_URL}orders/${id}/`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Action to handle order payment
export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}orders/${id}/pay/`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Action to mark an order as delivered
export const deliverOrder = order => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${API_URL}orders/${order._id}/deliver/`,
      {},
      config
    );

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Action to fetch user's orders
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API_URL}orders/myorders/`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// Action to fetch all orders (admin only)
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API_URL}orders/`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
