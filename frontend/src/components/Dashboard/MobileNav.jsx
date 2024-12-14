import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import { clearCart } from '../../actions/cartActions';
import {
  IconButton,
  Flex,
  HStack,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Badge,
  Button,
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import { ShoppingCart } from 'lucide-react';
import ColorModeSwitcher from '../ColorModeSwitcher';

const MobileNav = ({ onOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const { cartItems } = useSelector(state => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      justifyContent="space-between"
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        icon={<FiMenu />}
      />
      <Text fontSize="2xl" onClick={() => navigate('/')} cursor="pointer">
        BONSAI
      </Text>
      <HStack>
        <ColorModeSwitcher />
        <RouterLink to="/cart">
          <Button variant="link">
            <ShoppingCart />
            <Badge>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</Badge>
          </Button>
        </RouterLink>
        <Menu>
          <MenuButton>
            <HStack>
              <Avatar src={userInfo?.avatar || '/media/default/avatar.jpg'} />
              <FiChevronDown />
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
