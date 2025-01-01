import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  SimpleGrid,
  Container,
  Heading,
  Box,
  Center,
  Text,
  VStack,
} from '@chakra-ui/react';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { listEssentialProducts } from '../actions/productActions';

function EssentialsPage() {
  const dispatch = useDispatch();
  const productEssentials = useSelector(state => state.productEssentials);
  const { error, loading, products, page, pages } = productEssentials;
  const location = useLocation();

  let keyword = location.search;

  // Scroll to top on location (route) change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  useEffect(() => {
    dispatch(listEssentialProducts());
  }, [dispatch]);

  return (
    <Container maxW="container.xlg" mt="100px" minH="100vh">
      <Center
        flexDirection={'column'}
        marginTop={50}
        marginBottom={100}
        justifyContent={'space-between'}
      >
        <VStack marginBottom={{ base: '50', md: '100px' }}>
          <Heading
            textTransform={'uppercase'}
            as="h1"
            size="2xl"
            mb={6}
            fontFamily="roza"
          >
            Essentials
          </Heading>
          <Text
            textAlign={'center'}
            fontFamily={'lato'}
            fontSize="lg"
            color="gray.600"
          >
            Pick from our selection of must have plant accessories
          </Text>
        </VStack>
        <SimpleGrid
          minChildWidth={300}
          spacing="10px"
          width="100%"
          px={5} // Padding to add spacing on small screens
        >
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            products.map(product => (
              <Product key={product._id} product={product} />
            ))
          )}
        </SimpleGrid>
        <Paginate page={page} pages={pages} keyword={keyword} />
      </Center>
    </Container>
  );
}

export default EssentialsPage;
