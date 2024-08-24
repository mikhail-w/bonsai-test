import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import './index.css';

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
