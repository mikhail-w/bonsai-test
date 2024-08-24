import ProductCarousel from '../components/ProductCarousel';
import { Col, Container } from 'react-bootstrap';
import '../assets/styles/HeroSection.css';

function HeroSection() {
  return (
    <Container className="heroSection">
      <Col className="title"> As Interesting as a Plant</Col>
      <Col>
        <ProductCarousel />
      </Col>
    </Container>
  );
}

export default HeroSection;
