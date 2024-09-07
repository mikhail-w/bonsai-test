import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts } from '../actions/productActions';
import '../index.css';
import Features from '../components/Features';
import ScrollToTop from '../components/ScrollToTop';
import HeroSection from '../components/HeroSection';
import Planet from './Explore';
import BenifitsSection from '../components/BenifitsSection';
import Navigation from '../components/Navigation';
import HeroSection2 from '../components/HeroSection2';
import ProductsSection from '../components/ProductsSection';
import ReviewsSection from './ReviewsSection';
import Footer from '../components/Footer';

function HomePage() {
  const dispatch = useDispatch();

  let keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {/* <Navigation /> */}
      <HeroSection2 />
      <ProductsSection />
      <BenifitsSection />
      <ReviewsSection />
      <ScrollToTop />
    </>
  );
}

export default HomePage;
