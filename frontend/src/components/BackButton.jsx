import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/BackButton.css';

function BackButton() {
  const navigate = useNavigate();
  return (
    <Link
      onClick={() => navigate(-1)}
      className="btn btn-light my-3 "
      id="backButton"
    >
      <i className="fa fa-arrow-left"></i>
      {' Go Back'}
    </Link>
  );
}

export default BackButton;
