import { Card, Button } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import '../assets/styles/Product.css';

function Product({ product }) {
  return (
    <Card className="my-3  rounded card-x" style={{ width: '18rem' }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={`http://127.0.0.1:8000${product.image}`} />
      </Link>
      <hr id="line" />
      <Card.Body className="cardBody">
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="cardTitleContainer">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} ${
                product.reviews.length == 1 ? 'review' : 'reviews'
              }`}
              color={'#f8e825'}
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
