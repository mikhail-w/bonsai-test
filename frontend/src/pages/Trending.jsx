import React from 'react';
import ModelViewer from '../components/ModelViewer';

function Trending() {
  return (
    // <>
    //   <div>Trending</div>
    // </>
    <div>
      <h1>3D Model Viewer</h1>
      {/* Provide the correct URL to the .glb file */}
      <ModelViewer modelUrl="../../public/ficus.glb" />
    </div>
  );
}

export default Trending;
