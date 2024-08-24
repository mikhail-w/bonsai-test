import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import ProductCarousel from '../components/ProductCarousel';
import '../index.css';
import '../assets/styles/HomePage.css';
import Features from '../components/Features';
import ScrollToTop from '../components/ScrollToTop';
import HeroSection from '../components/HeroSection';

import Header from '../components/Header';
import Footer from '../components/Footer';

function HomePage() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <Header />
      <HeroSection />
      <Features />
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default HomePage;
