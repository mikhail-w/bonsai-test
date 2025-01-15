import React, { useState, useRef, useEffect } from 'react';

const MobileFeatureSlider = ({ features }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);

  // Minimum swipe distance to trigger slide change (in pixels)
  const minSwipeDistance = 50;

  const handleTouchStart = e => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchMove = e => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSlide < features.length - 1) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => Math.min(prev + 1, features.length - 1));
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match this with the transition duration in CSS

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white dark:bg-gray-800">
      {/* Progress indicators */}
      <div className="absolute top-4 left-0 right-0 z-10 flex justify-center gap-2">
        {features.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-green-500'
                : 'w-2 bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Slides container */}
      <div
        ref={sliderRef}
        className="h-full w-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex min-w-full flex-col items-center justify-center px-6"
            >
              <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <div className="relative mb-6">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="mx-auto h-48 w-full object-contain"
                  />
                </div>

                <div className="space-y-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-4">
        <button
          onClick={prevSlide}
          className={`rounded-full bg-white/80 p-2 text-gray-800 shadow-lg transition-opacity dark:bg-gray-800/80 dark:text-gray-200 ${
            currentSlide === 0 ? 'opacity-0' : 'opacity-100'
          }`}
          disabled={currentSlide === 0}
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className={`rounded-full bg-white/80 p-2 text-gray-800 shadow-lg transition-opacity dark:bg-gray-800/80 dark:text-gray-200 ${
            currentSlide === features.length - 1 ? 'opacity-0' : 'opacity-100'
          }`}
          disabled={currentSlide === features.length - 1}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default MobileFeatureSlider;
