import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { listProducts } from '../actions/productActions';
import '../index.css';
import Features from '../components/Features';
import ScrollToTop from '../components/ScrollToTop';
import HeroSection from '../components/HeroSection';
import Planet from './Explore';
import LandingPage from './LandingPage';
import CurvedBackground from '../components/CurvedBackground';
import WavyBackground from '../components/WavyBackground';
import Navigation from '../components/Navigation';
import HeroSection2 from '../components/HeroSection2';

function HomePage() {
  const dispatch = useDispatch();

  let keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {/* <Navigation /> */}
      <WavyBackground />
      <CurvedBackground />
      <LandingPage />
      {/* <HeroSection />
      <Features />
      <ScrollToTop /> */}
    </>
  );
}

export default HomePage;
