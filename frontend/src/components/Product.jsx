import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Button,
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const roundedRating = Math.round(product.rating * 2) / 2;

  const addToCartHandler = () => {
    if (product._id) {
      dispatch(addToCart(product._id, 1));
    }
  };

  return (
    <Flex
      p={4}
      w="full"
      alignItems="center"
      justifyContent="center"

      // _hover={{ boxShadow: 'md' }}
    >
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
        // minH={'sm'}
        // border="1px"
        // borderColor="gray.200"
      >
        {product.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.300"
            border="2px solid white"
          />
        )}

        <Link to={`/product/${product._id}`}>
          <Image
            src={`http://127.0.0.1:8000${product.image}`}
            alt={`Picture of ${product.name}`}
            roundedTop="lg"
            objectFit="cover"
            height="200px" // Fixed height for uniformity
            width="100%"
            transition="all 0.3s ease"
            // _hover={{ opacity: 0.8 }}
          />
        </Link>

        <Box p="6">
          <Box display="flex" alignItems="baseline" mb={2}>
            {product.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </Box>

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
              {Array(5)
                .fill('')
                .map((_, i) => {
                  if (roundedRating - i >= 1) {
                    return (
                      <BsStarFill
                        key={i}
                        style={{ marginLeft: '2px' }}
                        color={i < product.rating ? 'teal.500' : 'gray.300'}
                      />
                    );
                  }
                  if (roundedRating - i === 0.5) {
                    return <BsStarHalf key={i} style={{ marginLeft: '2px' }} />;
                  }
                  return <BsStar key={i} style={{ marginLeft: '2px' }} />;
                })}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {product.numReviews} review{product.numReviews > 1 && 's'}
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
