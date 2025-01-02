import { Outlet } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Navigation } from '@components/Navigation';
import Footer from './components/Footer';

import './index.css';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
