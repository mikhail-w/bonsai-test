import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';
import '../assets/styles/Carousel.css';

function ProductCarousel() {
  const dispatch = useDispatch();

  const productTopRated = useSelector(state => state.productTopRated);
  const { error, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      fade
      pause="hover"
      className="carousel-dark carousel "
      controls={false}
    >
      {products.map(product => (
        <Carousel.Item key={product._id} id="carousel">
          <Link to={`/product/${product._id}`}>
            <Image
              id="image"
              src={`http://127.0.0.1:8000${product.image}`}
              alt={product.name}
              fluid
            />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
