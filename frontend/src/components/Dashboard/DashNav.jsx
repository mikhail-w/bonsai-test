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
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import { ShoppingCart } from 'lucide-react';
import ColorModeSwitcher from '../ColorModeSwitcher';

const DashNav = ({ onOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.cart);
  const bgColor = useColorModeValue('white', 'gray.900');
  const textColor = useColorModeValue('gray.900', 'white');
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { userInfo } = useSelector(state => state.userLogin);

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
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      bg={bgColor}
      position="sticky"
      top="0px"
      zIndex="1000"
      boxShadow="sm"
    >
      {/* Mobile Menu Button */}
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        icon={<FiMenu />}
        aria-label="Open Menu"
      />

      {/* Right Section */}
      <HStack spacing={isMobile ? '20px' : '30px'}>
        <ColorModeSwitcher />

        {/* Cart Icon with Badge */}
        <RouterLink to="/cart">
          <Button variant="link" position="relative" aria-label="Cart">
            <ShoppingCart />
            <Badge
              position="absolute"
              top="-2px"
              right="-10px"
              bg="green.500"
              color="white"
              borderRadius="full"
              px={2}
              fontSize="0.8em"
              display={
                cartItems.reduce((acc, item) => acc + item.qty, 0) > 0
                  ? 'inline'
                  : 'none'
              }
            >
              {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </Badge>
          </Button>
        </RouterLink>

        {/* User Menu */}
        <Menu>
          <MenuButton as={Button} variant="link">
            <HStack>
              <Avatar
                src={userInfo?.avatar || 'https://via.placeholder.com/150'}
                name={userInfo?.name || 'Guest'}
              />
              {!isMobile && (
                <Text color={textColor}>{userInfo?.name || 'Guest'}</Text>
              )}
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

export default DashNav;
