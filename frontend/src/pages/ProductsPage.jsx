import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useNavigate } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import '../assets/styles/ProductsPage.css';
// import '../index.css';

function ProductsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector(state => state.productList);
  const { error, loading, products, page, pages } = productList;
  // console.log('Products List:', productList);

  let keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);
  return (
    <>
      <Container className="productsContainer">
        <h1 className="title">All Products</h1>
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
        <Paginate page={page} pages={pages} keyword={keyword} />
      </Container>
    </>
  );
}

export default ProductsPage;
