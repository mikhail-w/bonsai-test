import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import ProductCarousel from '../components/ProductCarousel';
import '../index.css';
import '../assets/styles/HomePage.css';
import Features from '../components/Features';
import CardSection from '../components/CardSection';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector(state => state.productList);
  const { error, loading, products, page, pages } = productList;

  let keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <HeroSection />
      {/* <div className="heroSection">{!keyword && <ProductCarousel />}</div> */}
      <Features />
      <CardSection />
      <ScrollToTop />
    </>
  );
}

export default HomePage;
