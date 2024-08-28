import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function YourInfo() {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div>
      Welcome Back <span>{userInfo.name}</span>
    </div>
  );
}

export default YourInfo;
