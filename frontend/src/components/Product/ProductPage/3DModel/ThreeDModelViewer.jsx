import React, { Suspense } from 'react';
import Model from './Model';
import Loader from '../../../Loader';

const ThreeDModelViewer = () => (
  <Suspense fallback={<Loader />}>
    <Model />
  </Suspense>
);

export default ThreeDModelViewer;
