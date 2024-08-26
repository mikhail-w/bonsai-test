import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useNavigate } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import '../assets/styles/ProductsPage.css';
// import '../index.css';
import { SimpleGrid, Center } from '@chakra-ui/react';

function ProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector(state => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);
  return (
    <>
      <Center
        flexDirection={'column'}
        marginTop={50}
        marginBottom={50}
        minH={'80vh'}
        justifyContent={'space-between'}
      >
        <h1 className="title">All Products</h1>
        <SimpleGrid minChildWidth="120px" spacing="40px">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant={'danger'}>{error}</Message>
          ) : (
            <>
              <Row>
                {products.map(product => (
                  <Col key={product._id}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </SimpleGrid>
        <Paginate page={page} pages={pages} keyword={keyword} />
      </Center>
    </>
  );
}

export default ProductsPage;
