import f1l from '../../../assets/images/feature001-light.png';
import f1d from '../../../assets/images/feature001-dark.png';
import f2l from '../../../assets/images/feature002-light.png';
import f2d from '../../../assets/images/feature002-dark.png';
import f3l from '../../../assets/images/feature003-light.png';
import f3d from '../../../assets/images/feature003-dark.png';
import f4l from '../../../assets/images/feature004-light.png';
import f4d from '../../../assets/images/feature004-dark.png';
import f5l from '../../../assets/images/feature005-light.png';
import f5d from '../../../assets/images/feature005-dark.png';
import f6l from '../../../assets/images/feature006-light.png';
import f6d from '../../../assets/images/feature006-dark.png';
import f7l from '../../../assets/images/feature007-light.png';
import f7d from '../../../assets/images/feature007-dark.png';
import f8 from '../../../assets/images/feature008.png';

export const getFeaturesData = useColorModeValue => [
  {
    title: 'Find Your Inner Peace',
    description:
      'Generate inspiring zen quotes to bring tranquility and clarity to your day.',
    image: useColorModeValue(f1l, f1d),
  },
  {
    title: 'Stay Ahead of the Weather',
    description:
      'Plan your day with precise, location-based weather updates at your fingertips.',
    image: useColorModeValue(f2l, f2d),
  },
  {
    title: 'Experience Bonsai in 3D',
    description:
      'Immerse yourself in the world of bonsai with stunning 3D and AR models.',
    image: useColorModeValue(f3l, f3d),
  },
  {
    title: 'Discover Local Treasures',
    description:
      'Use our integrated map to find bonsai nurseries, stores, and clubs near you.',
    image: useColorModeValue(f4l, f4d),
  },
  {
    title: 'Join the Bonsai Community',
    description: 'Read and share stories in our vibrant bonsai blog.',
    image: useColorModeValue(f5l, f5d),
  },
  {
    title: 'Identify Any Plant Instantly',
    description:
      'Snap a photo and let our AI-powered tool tell you all about your plant.',
    image: useColorModeValue(f6l, f6d),
  },
  {
    title: 'Chat with the Zen Master',
    description:
      'Get advice and insights from our AI-powered Zen Master chatbot.',
    image: useColorModeValue(f7l, f7d),
  },
  {
    title: 'Effortless and Secure Checkout',
    description:
      'Enjoy a seamless shopping experience with PayPal. Your purchases are secure, fast, and hassle-free.',
    image: useColorModeValue(f8, f8),
  },
];
