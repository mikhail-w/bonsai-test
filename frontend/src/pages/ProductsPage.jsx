import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useNavigate } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
// import '../assets/styles/ProductsPage.css';
import { SimpleGrid, Center, Box, Container } from '@chakra-ui/react';

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
      <Container maxW="container.xlg" mt={'100px'} minH={'100vh'}>
        <Center
          flexDirection={'column'}
          // marginTop={50}
          marginBottom={50}
          minH={'80vh'}
          justifyContent={'space-between'}
        >
          <h1 className="title">All Products</h1>
          <SimpleGrid
            minChildWidth={300}
            spacing="10px"
            width="90%"
            px={5} // Padding to add spacing on small screens
          >
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant={'danger'}>{error}</Message>
            ) : (
              products.map(product => (
                <Product key={product._id} product={product} />
              ))
            )}
          </SimpleGrid>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </Center>
      </Container>
    </>
  );
}

export default ProductsPage;
