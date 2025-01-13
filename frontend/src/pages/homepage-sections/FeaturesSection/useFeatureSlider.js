import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from '@chakra-ui/react';

const useFeatureSlider = features => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [previousFeature, setPreviousFeature] = useState(-1);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)');
  const containerRef = useRef(null);

  const handleTouchStart = e => setTouchStart(e.touches[0].clientX);
  const handleTouchMove = e => setTouchEnd(e.touches[0].clientX);

  const handleTouchEnd = () => {
    const minSwipeDistance = 50;
    if (touchStart - touchEnd > minSwipeDistance) {
      setPreviousFeature(currentFeature);
      setCurrentFeature(prev => (prev + 1) % features.length);
    }
    if (touchEnd - touchStart > minSwipeDistance) {
      setPreviousFeature(currentFeature);
      setCurrentFeature(prev => (prev === 0 ? features.length - 1 : prev - 1));
    }
  };

  const handleIndicatorClick = index => {
    setPreviousFeature(currentFeature);
    setCurrentFeature(index);
  };

  useEffect(() => {
    if (isLargerThan768) {
      const interval = setInterval(() => {
        setPreviousFeature(currentFeature);
        setCurrentFeature(prev => (prev + 1) % features.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [currentFeature, isLargerThan768]);

  return {
    currentFeature,
    previousFeature,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleIndicatorClick,
    isLargerThan768,
    containerRef,
  };
};

export default useFeatureSlider;
