import React from 'react';
import Header from '../components/Header';
import notFound from '../assets/images/404.svg';
import '../assets/styles/NotFoundPage.css';

function NotFoundPage() {
  return (
    <>
      <Header />
      <div className="notFoundContainer">
        <img src={notFound}></img>
        <div className="notFoundTitle">Page not found!</div>
      </div>
      <div className="notFoundSub">Sorry, this page is not available...</div>
    </>
  );
}

export default NotFoundPage;
