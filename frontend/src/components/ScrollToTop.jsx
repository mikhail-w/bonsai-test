import { useState, useEffect } from 'react';
import styled from 'styled-components';
import scrollToTopImage from '../assets/images/leaf1.png';

// Keyframes for the up and down animation
const float = `
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px); /* Move up by 10px */
    }
    100% {
      transform: translateY(0); /* Return to original position */
    }
  }
`;

const ScrollButton = styled.div`
  position: fixed;
  bottom: 50px;
  right: 20px;
  width: 50px;
  height: 100px;
  background-image: url(${scrollToTopImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  display: ${({ show }) => (show === 'true' ? 'block' : 'none')};
  transition: opacity 0.3s ease-in-out;
  opacity: 0.5; /* Semi-transparent by default */
  z-index: 1000;

  &:hover {
    opacity: 0.9; /* Less transparent on hover */
    animation: float 1.5s ease-in-out infinite; /* Floating animation on hover */
  }

  ${float}/* Inject the keyframes */
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
