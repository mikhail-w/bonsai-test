import React from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import home from '../assets/images/home.jpg';
import '../index.css';

const LandingPage = () => {
  return (
    <div className="custom-shape-divider-top-1725585712">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="shape-fill"
        ></path>
      </svg>
    </div>
  );
};

export default LandingPage;
