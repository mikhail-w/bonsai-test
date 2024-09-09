import { useEffect } from 'react';
import '../index.css';
import ScrollToTopButton from '../components/ScrollToTopButton';
import BenifitsSection from '../components/BenifitsSection';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import ReviewsSection from './ReviewsSection';
import Globe from '../components/Globe';

function HomePage() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <HeroSection />
      <ProductsSection />
      <BenifitsSection />
      <ReviewsSection />
      <Globe />
      <ScrollToTopButton />
    </>
  );
}

export default HomePage;
