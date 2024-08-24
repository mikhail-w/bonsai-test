// Card.js
import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 200px;
  height: 400px;
  margin: 10px;
  position: relative;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: width 0.3s ease-in-out, background-image 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    width: 400px;
  }

  &:hover .hover-image {
    opacity: 1;
  }

  &:hover .card-title {
    opacity: 0;
  }
`;

const CardContent = styled.div`
  padding: 20px;
  background-color: #fff9f1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  z-index: 2;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #333;
  transition: opacity 0.3s ease-in-out;
`;

const HoverImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 1;
`;

const Card = ({ title, description, bgImage, hoverBgImage }) => {
  return (
    <CardContainer bgImage={bgImage}>
      <CardContent>
        <CardTitle className="card-title">{title}</CardTitle>
      </CardContent>
      <HoverImage src={hoverBgImage} alt={title} className="hover-image" />
    </CardContainer>
  );
};

export default Card;
