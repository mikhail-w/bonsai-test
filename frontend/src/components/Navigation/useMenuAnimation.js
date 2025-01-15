import { useState } from 'react';

export const useMenuAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCircleAnimationDone, setIsCircleAnimationDone] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsCircleAnimationDone(false);
      setTimeout(() => {
        setIsCircleAnimationDone(true);
      }, 800);
    }
  };

  return { isOpen, isCircleAnimationDone, toggleMenu, setIsOpen };
};
