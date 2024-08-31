import {
  Flex,
  Box,
  Image,
  Tooltip,
  Button,
  Icon,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import Rating from './Rating';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const roundedRating = Math.round(product.rating * 2) / 2;

  const addToCartHandler = () => {
    if (product._id) {
      dispatch(addToCart(product._id, 1));
    }
  };

  return (
    <Flex p={4} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW={300}
        minW={300}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        overflow="hidden"
        transition="all 0.3s ease"
        _hover={{
          transform: 'scale(1.02)',
          shadow: 'xl',
          boxShadow: '0 0 0 4px  rgba(210, 215, 211, 0.808)',
        }}
      >
        <Link to={`/product/${product._id}`}>
          <Image
            src={`http://127.0.0.1:8000${product.image}`}
            alt={`Picture of ${product.name}`}
            roundedTop="lg"
            objectFit="scaledown"
            height="300px"
            width="100%"
            transition="all 0.3s ease"
          />
        </Link>
        <Divider />
        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignItems="end">
            <Box
              fontSize="xl"
              fontWeight="bold"
              as="h4"
              lineHeight="tight"
              isTruncated
              color={useColorModeValue('gray.800', 'white')}
              fontFamily="rale"
            >
              {product.name}
            </Box>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement="top"
              color="gray.800"
              fontSize="1.2em"
            >
              <Button
                onClick={addToCartHandler}
                variant="ghost"
                aria-label="Add to cart"
                _hover={{ bg: 'transparent' }}
              >
                <Icon
                  as={FiShoppingCart}
                  h={7}
                  w={7}
                  _hover={{
                    transform: 'scale(1.2)',
                    transition: 'transform 0.2s',
                  }}
                />
              </Button>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignItems="center" mt={2}>
            <Box display="flex" alignItems="center">
              <Rating value={roundedRating} color="#008b4a" />
              <Box
                as="span"
                ml="2"
                color="gray.600"
                fontSize="sm"
                fontFamily="rale"
              >
                {product.numReviews} review{product.numReviews !== 1 && 's'}
              </Box>
            </Box>
            <Box fontSize="xl" color={useColorModeValue('gray.800', 'white')}>
              <Box
                as="span"
                color="gray.600"
                fontSize="lg"
                fontFamily="heading"
              >
                ${product.price}
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Product;
