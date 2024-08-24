import { useState, useEffect } from 'react';
import styled from 'styled-components';
import scrollToTopImage from '../assets/images/leaf.png';

const ScrollButton = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  background-image: url(${scrollToTopImage});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  display: ${({ show }) => (show == 'true' ? 'block' : 'none')};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  z-index: 1000;

  &:hover {
    transform: translateY(-10px); /* Move up by 10px */
    opacity: 0.8;
  }
`;

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState('false');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton('true');
      } else {
        setShowButton('false');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return <ScrollButton show={showButton} onClick={scrollToTop} />;
};

export default ScrollToTop;
