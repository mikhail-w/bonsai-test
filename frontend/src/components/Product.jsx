// import { Card, Button } from 'react-bootstrap';
// import Rating from './Rating';
// import { Link } from 'react-router-dom';
// import '../assets/styles/Product.css';

// function Product({ product }) {
//   return (
//     <Card className="my-3  rounded card-x" style={{ width: '18rem' }}>
//       <Link to={`/product/${product._id}`}>
//         <Card.Img src={`http://127.0.0.1:8000${product.image}`} />
//       </Link>
//       <hr id="line" />
//       <Card.Body className="cardBody">
//         <Link to={`/product/${product._id}`}>
//           <Card.Title as="div" className="cardTitleContainer">
//             <strong>{product.name}</strong>
//           </Card.Title>
//         </Link>
//         <Card.Text as="div">
//           <div className="my-3">
//             <Rating
//               value={product.rating}
//               text={`${product.numReviews} ${
//                 product.reviews.length == 1 ? 'review' : 'reviews'
//               }`}
//               color={'#f8e825'}
//             />
//           </div>
//         </Card.Text>
//         <Card.Text as="h3">${product.price}</Card.Text>
//       </Card.Body>
//     </Card>
//   );
// }

// export default Product;

// import { Box, Image, Text, Heading, Divider, Stack } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
// import Rating from './Rating';
// import '../assets/styles/Product.css';

// function Product({ product }) {
//   return (
//     <Box
//       borderWidth="1px"
//       borderRadius="lg"
//       overflow="hidden"
//       boxShadow="md"
//       className="my-3 card-x"
//       width="18rem"
//       bg="white"
//     >
//       <Link to={`/product/${product._id}`}>
//         <Image
//           src={`http://127.0.0.1:8000${product.image}`}
//           alt={product.name}
//           objectFit="cover"
//           height="200px"
//           width="100%"
//         />
//       </Link>

//       <Divider id="line" />

//       <Box p={5} className="cardBody">
//         <Link to={`/product/${product._id}`}>
//           <Heading as="h4" size="md" className="cardTitleContainer">
//             <strong>{product.name}</strong>
//           </Heading>
//         </Link>

//         <Text className="my-3">
//           <Rating
//             value={product.rating}
//             text={`${product.numReviews} ${
//               product.reviews.length === 1 ? 'review' : 'reviews'
//             }`}
//             color={'#f8e825'}
//           />
//         </Text>

//         <Text as="h3" fontSize="lg" fontWeight="bold">
//           ${product.price}
//         </Text>
//       </Box>
//     </Box>
//   );
// }

// export default Product;

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
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const Product = ({ product }) => {
  // console.log('Product Image:', product.image);
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
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        {product.isNew && (
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
        )}

        <Link to={`/product/${product._id}`}>
          <Image
            src={`http://127.0.0.1:8000${product.image}`}
            alt={`Picture of ${product.name}`}
            roundedTop="lg"
            objectFit="cover"
            height="200px"
            width="100%"
          />
        </Link>

        <Box p="6">
          <Box display="flex" alignItems="baseline">
            {product.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                New
              </Badge>
            )}
          </Box>

          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {product.name}
            </Box>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement={'top'}
              color={'gray.800'}
              fontSize={'1.2em'}
            >
              <chakra.a href={'#'} display={'flex'} onClick={addToCartHandler}>
                <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
              </chakra.a>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Box display="flex" alignItems="center">
              {Array(5)
                .fill('')
                .map((_, i) => {
                  if (roundedRating - i >= 1) {
                    return (
                      <BsStarFill
                        key={i}
                        style={{ marginLeft: '1' }}
                        color={i < product.rating ? 'teal.500' : 'gray.300'}
                      />
                    );
                  }
                  if (roundedRating - i === 0.5) {
                    return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
                  }
                  return <BsStar key={i} style={{ marginLeft: '1' }} />;
                })}
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {product.numReviews} review{product.numReviews > 1 && 's'}
              </Box>
            </Box>
            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              <Box as="span" color={'gray.600'} fontSize="lg">
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
