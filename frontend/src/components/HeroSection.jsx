import ProductCarousel from '../components/ProductCarousel';
import { Col, Container, Row } from 'react-bootstrap';
import '../assets/styles/HeroSection.css';

function HeroSection() {
  return (
    <Container className="heroSection">
      <Row className="title"> As Interesting as a Plant</Row>
      <Row className="heroCarousel">
        <ProductCarousel />
      </Row>
    </Container>
  );
}

export default HeroSection;
