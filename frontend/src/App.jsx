import { Outlet } from 'react-router-dom';
import Header from './components/oldNav';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

import './index.css';

function App() {
  return (
    <>
      {/* <Header /> */}
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
