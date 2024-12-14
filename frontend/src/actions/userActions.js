import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from '../constants/userConstants';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';

const API_URL = import.meta.env.VITE_API_URL.endsWith('/')
  ? import.meta.env.VITE_API_URL
  : `${import.meta.env.VITE_API_URL}/`;

// Utility to extract error messages
const getErrorPayload = error => {
  return error.response && error.response.data.detail
    ? error.response.data.detail
    : error.message;
};

// Login User
export const login = (email, password) => async dispatch => {
  console.log('Login function triggered with:', { email, password });
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    console.log('USER_LOGIN_REQUEST dispatched');

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    console.log('Sending POST request to:', `${API_URL}users/login/`);

    const { data } = await axios.post(
      `${API_URL}users/login/`,
      { username: email, password },
      config
    );

    console.log('POST request successful. Response data:', data);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    console.log('USER_LOGIN_SUCCESS dispatched');

    localStorage.setItem('userInfo', JSON.stringify(data));

    console.log('User info saved to localStorage');
  } catch (error) {
    console.error('Login error:', error);

    dispatch({ type: USER_LOGIN_FAIL, payload: getErrorPayload(error) });
  }
};

// Logout User
export const logout = () => dispatch => {
  console.log('Logout function triggered');
  localStorage.removeItem('userInfo');
  console.log('Removed userInfo from localStorage');
  localStorage.removeItem('shippingAddress');
  console.log('Removed shippingAddress from localStorage');

  dispatch({ type: USER_LOGOUT });
  console.log('USER_LOGOUT dispatched');

  dispatch({ type: USER_DETAILS_RESET });
  console.log('USER_DETAILS_RESET dispatched');

  dispatch({ type: ORDER_LIST_MY_RESET });
  console.log('ORDER_LIST_MY_RESET dispatched');

  dispatch({ type: USER_LIST_RESET });
  console.log('USER_LIST_RESET dispatched');
};

// Register User
export const register = (name, email, password, avatar) => async dispatch => {
  console.log('Register function triggered with:', {
    name,
    email,
    password,
    avatar,
  });
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    console.log('USER_REGISTER_REQUEST dispatched');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (avatar) {
      formData.append('avatar', avatar);
      console.log('Avatar file appended to formData');
    }

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    console.log('Sending POST request to:', `${API_URL}users/register/`);

    const { data } = await axios.post(
      `${API_URL}users/register/`,
      formData,
      config
    );

    console.log('POST request successful. Response data:', data);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    console.log('USER_REGISTER_SUCCESS dispatched');

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    console.log('USER_LOGIN_SUCCESS dispatched');

    localStorage.setItem('userInfo', JSON.stringify(data));
    console.log('User info saved to localStorage');
  } catch (error) {
    console.error('Register error:', error);
    dispatch({ type: USER_REGISTER_FAIL, payload: getErrorPayload(error) });
  }
};

// Get User Details
export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo ? `Bearer ${userInfo.token}` : '',
      },
    };

    const { data } = await axios.get(`${API_URL}users/${id}/`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: getErrorPayload(error) });
  }
};

// Update User Profile
export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo ? `Bearer ${userInfo.token}` : '',
      },
    };

    const { data } = await axios.put(
      `${API_URL}users/profile/update/`,
      user,
      config
    );

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: getErrorPayload(error),
    });
  }
};

// List Users
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo ? `Bearer ${userInfo.token}` : '',
      },
    };

    const { data } = await axios.get(`${API_URL}users/`, config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_LIST_FAIL, payload: getErrorPayload(error) });
  }
};

// Delete User
export const deleteUser = id => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo ? `Bearer ${userInfo.token}` : '',
      },
    };

    await axios.delete(`${API_URL}users/delete/${id}/`, config);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_DELETE_FAIL, payload: getErrorPayload(error) });
  }
};

// Update User
export const updateUser = user => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo ? `Bearer ${userInfo.token}` : '',
      },
    };

    const { data } = await axios.put(
      `${API_URL}users/update/${user._id}/`,
      user,
      config
    );

    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: getErrorPayload(error) });
  }
};
