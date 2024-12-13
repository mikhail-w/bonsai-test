import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listProductDetails,
  createProductReview,
} from '../../../../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../../../constants/productConstants';

const useProductPageLogic = id => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const userLogin = useSelector(state => state.userLogin);
  const productReviewCreate = useSelector(state => state.productReviewCreate);

  useEffect(() => {
    if (productReviewCreate.success) {
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, id, productReviewCreate.success]);

  const addToCartHandler = navigate => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return {
    qty,
    setQty,
    rating,
    setRating,
    comment,
    setComment,
    addToCartHandler,
    submitHandler,
    productDetails,
    userLogin,
    productReviewCreate,
  };
};

export default useProductPageLogic;
