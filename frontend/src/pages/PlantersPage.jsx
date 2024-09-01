import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { listPlanterProducts } from '../actions/productActions';
import { SimpleGrid, Center, Box, Container, Heading } from '@chakra-ui/react';

function PlantersPage() {
  const dispatch = useDispatch();
  const productPlanter = useSelector(state => state.productPlanter);
  const { error, loading, products, page, pages } = productPlanter;

  let keyword = location.search;

  useEffect(() => {
    dispatch(listPlanterProducts());
  }, [dispatch]);

  return (
    <Container maxW="container.xl" mt="100px" minH="100vh">
      <Center
        flexDirection="column"
        mt={12}
        mb={12}
        minH="80vh"
        justifyContent="space-between"
      >
        <h1 className="title">Planters</h1>
        <SimpleGrid minChildWidth="300px" spacing="10px" width="90%" px={5}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              {products.map(product => (
                <Box key={product._id}>
                  <Product product={product} />
                </Box>
              ))}
            </>
          )}
        </SimpleGrid>
        <Paginate page={page} pages={pages} keyword={keyword} />
      </Center>
    </Container>
  );
}

export default PlantersPage;
