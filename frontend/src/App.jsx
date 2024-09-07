import { Outlet } from 'react-router-dom';
// import NavBar from './components/NavBar';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import './index.css';

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
