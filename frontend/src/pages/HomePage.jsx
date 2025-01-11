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
import FeaturesSection from './homepage-sections/FeaturesSection';
import { Box } from '@chakra-ui/react';

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
      <Box height="120px" bg="transparent" />
      <BenefitsSection />
      <Box height="120px" bg="transparent" />
      <FeaturesSection />
      <ReviewsSection />
      <ExpandingCardsSection />
      <GlobeSection />
      <NewsLetterSection />
      <ScrollToTopButton />
    </>
  );
}

export default HomePage;
