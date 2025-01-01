import { useEffect } from 'react';
import '../index.css';
import ScrollToTopButton from '../../components/ScrollToTopButton';
import BenifitsSection from '../components/BenefitsSection';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/FeaturedProductsSection';
import ReviewsSection from '../components/ReviewsSection';
import Globe from '../components/Globe';
import NewsLetterSection from '../components/NewsLetterSection';

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
      <NewsLetterSection />
      <ScrollToTopButton />
    </>
  );
}

export default HomePage;
