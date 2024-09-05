
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './ModalViewer.css';

function ModalViewer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>Close</button>
        <Canvas>
          <OrbitControls />
          <ambientLight intensity={1.5} />
          <Model />
        </Canvas>
      </div>
    </div>
  );
}

function Model() {
  const { scene } = useGLTF('public/ficus_bonsai (1).glb'); 
  return <primitive object={scene} scale={2} />;
};

export default ModalViewer;
