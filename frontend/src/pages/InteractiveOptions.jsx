// src/components/InteractiveOptions/InteractiveOptions.jsx
import React, { useState } from 'react';
import ModalViewer from './ModalViewer';
import './InteractiveOptions.css';

function InteractiveOptions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="interactive-options">
      <button onClick={handleOpenModal}>See This in 3D</button>
      <button>Plan a space with this item</button>
      

      <ModalViewer isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default InteractiveOptions;
