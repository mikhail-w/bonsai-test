import { useEffect } from 'react';
import '../index.css';
import ScrollToTopButton from '../components/ScrollToTopButton';
import {
  HeroSection,
  FeaturedProductsSection,
  BenefitsSection,
  ExpandingCardsSection,
  ReviewsSection,
  GlobeSection,
  NewsLetterSection,
} from '@homepageSections';

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
      <FeaturedProductsSection />
      <BenefitsSection />
      <ReviewsSection />
      <ExpandingCardsSection />
      <GlobeSection />
      <NewsLetterSection />
      <ScrollToTopButton />
    </>
  );
}

export default HomePage;
