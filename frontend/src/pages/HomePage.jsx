import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts } from '../actions/productActions';
import '../index.css';
import Features from '../components/Features';
import ScrollToTop from '../components/ScrollToTop';
import HeroSection from '../components/HeroSection';
import Planet from './Explore';

function HomePage() {
  const dispatch = useDispatch();

  let keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <HeroSection />
      <Features />
      <ScrollToTop />
    </>
  );
}

export default HomePage;
