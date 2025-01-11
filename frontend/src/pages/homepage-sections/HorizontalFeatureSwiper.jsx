import React, { useState, useEffect } from 'react';

const HorizontalFeatureSwiper = ({ features }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  const handleTouchStart = e => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = e => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    const newTranslate = prevTranslate + diff;
    setCurrentTranslate(newTranslate);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;

    if (Math.abs(movedBy) > 100) {
      if (movedBy > 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      } else if (movedBy < 0 && activeIndex < features.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    }

    setPrevTranslate(activeIndex * -100);
    setCurrentTranslate(activeIndex * -100);
  };

  useEffect(() => {
    setPrevTranslate(activeIndex * -100);
    setCurrentTranslate(activeIndex * -100);
  }, [activeIndex]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-white dark:bg-gray-800">
      {/* Progress dots */}
      <div className="absolute top-4 left-0 right-0 z-10 flex justify-center gap-2">
        {features.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? 'w-8 bg-green-500'
                : 'w-2 bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Features container */}
      <div
        className="flex h-full touch-pan-x"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: `translateX(${
            isDragging ? currentTranslate : activeIndex * -100
          }%)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        {features.map((feature, idx) => (
          <div key={idx} className="min-w-full flex-shrink-0 px-6 py-12">
            <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center space-y-8">
              {/* Feature image */}
              <div className="relative w-full overflow-hidden rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="mx-auto h-64 w-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Feature content */}
              <div className="text-center">
                <h3 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => activeIndex > 0 && setActiveIndex(activeIndex - 1)}
        className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-4 text-2xl shadow-lg transition-opacity dark:bg-gray-800/80 ${
          activeIndex === 0 ? 'opacity-0' : 'opacity-100'
        }`}
        disabled={activeIndex === 0}
      >
        ←
      </button>
      <button
        onClick={() =>
          activeIndex < features.length - 1 && setActiveIndex(activeIndex + 1)
        }
        className={`absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-4 text-2xl shadow-lg transition-opacity dark:bg-gray-800/80 ${
          activeIndex === features.length - 1 ? 'opacity-0' : 'opacity-100'
        }`}
        disabled={activeIndex === features.length - 1}
      >
        →
      </button>
    </div>
  );
};

export default HorizontalFeatureSwiper;
