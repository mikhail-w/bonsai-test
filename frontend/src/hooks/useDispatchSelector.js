import { useDispatch, useSelector } from 'react-redux';

export const useDispatchSelector = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  return { dispatch, state };
};
