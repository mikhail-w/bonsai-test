import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import '../index.css';
import ScrollToTop from '../components/ScrollToTop';
import BenifitsSection from '../components/BenifitsSection';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import ReviewsSection from './ReviewsSection';

function HomePage() {
  const dispatch = useDispatch();

  let keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <HeroSection />
      <ProductsSection />
      <BenifitsSection />
      <ReviewsSection />
      <ScrollToTop />
    </>
  );
}

export default HomePage;
