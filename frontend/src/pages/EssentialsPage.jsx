import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { listEssentialProducts } from '../actions/productActions';
import '../index.css';

function EssentialsPage() {
  const dispatch = useDispatch();
  const productEssentials = useSelector(state => state.productEssentials);
  const { error, loading, products, page, pages } = productEssentials;

  let keyword = location.search;

  useEffect(() => {
    dispatch(listEssentialProducts());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        // <h2>Loading...</h2>
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error}</Message>
      ) : (
        <>
          <Container className="listContainer">
            <h1 className="title">Essentials</h1>

            <Row>
              {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
      <Paginate page={page} pages={pages} keyword={keyword} />
    </>
  );
}

export default EssentialsPage;
