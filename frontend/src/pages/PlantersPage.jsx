import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { listPlanterProducts } from '../actions/productActions';
import { SimpleGrid, Center, Box } from '@chakra-ui/react';
import '../index.css';

function PlantersPage() {
  const dispatch = useDispatch();
  const productPlanter = useSelector(state => state.productPlanter);
  const { error, loading, products, page, pages } = productPlanter;

  let keyword = location.search;

  useEffect(() => {
    dispatch(listPlanterProducts());
  }, [dispatch]);
  return (
    <>
      <Center
        flexDirection={'column'}
        marginTop={50}
        marginBottom={50}
        minH={'80vh'}
        justifyContent={'space-between'}
      >
        <h1 className="title">Planters</h1>
        <SimpleGrid
          minChildWidth={300}
          spacing="10px"
          width="90%"
          px={5} // Padding to add spacing on small screens
        >
          {loading ? (
            // <h2>Loading...</h2>
            <Loader />
          ) : error ? (
            <Message variant={'danger'}>{error}</Message>
          ) : (
            <>
              <Container className="listContainer">
                <Row id="out">
                  {products.map(product => (
                    // <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Col key={product._id}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
              </Container>
            </>
          )}
        </SimpleGrid>
        <Paginate page={page} pages={pages} keyword={keyword} />
      </Center>
    </>
  );
}

export default PlantersPage;
