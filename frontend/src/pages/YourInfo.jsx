import { useSelector } from 'react-redux';

import UserProfile from '../components/UserProfile';

function YourInfo() {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <div>
      Welcome Back <span>{userInfo.name}</span>
      <UserProfile />
    </div>
  );
}

export default YourInfo;
