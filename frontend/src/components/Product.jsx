import {
  Flex,
  Box,
  Image,
  Tooltip,
  Button,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaLeaf } from 'react-icons/fa';
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
        minW={300}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        overflow="hidden"
        transition="all 0.3s ease"
        _hover={{ transform: 'scale(1.02)', shadow: 'xl' }}
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

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignItems="center">
            <Box
              fontSize="xl"
              fontWeight="bold"
              as="h4"
              lineHeight="tight"
              isTruncated
              color={useColorModeValue('gray.800', 'white')}
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
              >
                <Icon as={FiShoppingCart} h={7} w={7} />
              </Button>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignItems="center" mt={2}>
            <Box display="flex" alignItems="center">
              {/* {Array(5)
                .fill('')
                .map((_, i) => {
                  if (roundedRating - i >= 1) {
                    return (
                      <FaLeaf
                        key={i}
                        style={{ marginLeft: '2px' }}
                        color="#17b169"
                      />
                    );
                  } else if (roundedRating - i === 0.5) {
                    return (
                      <Box
                        key={i}
                        position="relative"
                        display="inline-block"
                        width="14px" // Adjust width to match leaf size
                        height="14px"
                      >
                        <FaLeaf
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            clipPath: 'inset(0 50% 0 0)',
                          }}
                          color="#17b169"
                        />
                        <FaLeaf
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            clipPath: 'inset(0 0 0 50%)',
                          }}
                          color="#bbbdbf"
                        />
                      </Box>
                    );
                  } else {
                    return (
                      <FaLeaf
                        key={i}
                        style={{ marginLeft: '2px' }}
                        color="#bbbdbf"
                      />
                    );
                  }
                })} */}
              <Rating card={'true'} value={roundedRating} color="#008b4a" />
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {product.numReviews} review{product.numReviews !== 1 && 's'}
              </Box>
            </Box>
            <Box fontSize="xl" color={useColorModeValue('gray.800', 'white')}>
              <Box as="span" color="gray.600" fontSize="lg">
                $
              </Box>
              {product.price}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default Product;
