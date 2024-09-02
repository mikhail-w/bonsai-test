import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productPlanterReducer,
  productPlantReducer,
  productEssentialsReducer,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
} from './reducers/orderReducers';

import {
  blogPostCreateReducer,
  blogPostDeleteReducer,
  blogPostDetailsReducer,
  blogPostLikeUnlikeReducer,
  blogCreateCommentReducer,
  blogGetCommentsReducer,
  blogListMyReducer,
  blogListReducer,
} from './reducers/blogReducers';

const reducer = combineReducers({
  // Product reducers
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productPlanter: productPlanterReducer,
  productPlants: productPlantReducer,
  productEssentials: productEssentialsReducer,

  // Cart reducer
  cart: cartReducer,

  // User reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  // Order reducers
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,

  // Blog reducers
  blogPostCreate: blogPostCreateReducer,
  blogPostDelete: blogPostDeleteReducer,
  blogPostDetails: blogPostDetailsReducer,
  blogPostLikeUnlike: blogPostLikeUnlikeReducer,
  blogCreateComment: blogCreateCommentReducer,
  blogGetComments: blogGetCommentsReducer,
  blogListMy: blogListMyReducer,
  blogList: blogListReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
