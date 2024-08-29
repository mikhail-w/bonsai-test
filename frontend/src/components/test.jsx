import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Searchbar.css';

function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
    if (keyword) {
      navigate(`/products/?keyword=${keyword}&page=1`);
      setTimeout(() => e.target.reset(), 0);
      setKeyword('');
    } else {
      // navigate(location.pathname);
      navigate(`/products/?keyword=${keyword}&page=1`);
      setTimeout(() => e.target.reset(), 0);
      setKeyword('');
    }
  };

  return (
    <Form onSubmit={submitHandler} id="searchbar">
      <Form.Control
        type="text"
        name="q"
        placeholder="Search plants"
        onChange={e => setKeyword(e.target.value)}
        className="me-2"
        autoComplete="off"
      ></Form.Control>
      <Button type="submit" id="search">
        Search
      </Button>
    </Form>
  );
}

export default SearchBar;
