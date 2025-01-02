// components/Navigation/UserAvatar.jsx
import { Avatar } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const UserAvatar = ({ userInfo, isOpen, isCircleAnimationDone }) => {
  // Return early if any condition isn't met
  if (!userInfo || !isOpen || !isCircleAnimationDone) return null;

  // Construct avatar source URL
  const defaultAvatar = `${import.meta.env.VITE_API_URL.replace(
    '/api/',
    ''
  )}/media/default/avatar.jpg`;

  const avatarSrc = userInfo.avatar
    ? `${import.meta.env.VITE_API_URL.replace('/api/', '')}${userInfo.avatar}`
    : defaultAvatar;

  console.log('Helloo');

  return (
    <RouterLink to="/profile">
      <Avatar
        src={avatarSrc}
        size="md"
        position="absolute"
        top="25px"
        right="120px"
        zIndex="300"
        name={userInfo.name || 'User'} // Add a fallback for name
        bg="gray.300" // Fallback background if avatar fails to load
        loading="lazy" // Improve performance with lazy loading
      />
    </RouterLink>
  );
};

export default UserAvatar;
