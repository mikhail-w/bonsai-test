import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import plantImage from '../assets/images/Hinoki-M.png';
import planterImage from '../assets/images/planters.png';
import essentialsImage from '../assets/images/essentials.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff9f1;
`;

const SelectionsTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
`;

const FeaturesGrid = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CardSection = () => {
  return (
    <Container>
      <SelectionsTitle>Shop our Selections</SelectionsTitle>
      <FeaturesGrid>
        <Card
          title="Plants"
          // bgImage="https://via.placeholder.com/200x300.png?text=Default+1"
          hoverBgImage={plantImage}
        />
        <Card
          title="Planters"
          // bgImage="https://via.placeholder.com/200x300.png?text=Default+2"
          hoverBgImage={planterImage}
        />
        <Card
          title="Essentials"
          // bgImage="https://via.placeholder.com/200x300.png?text=Default+3"
          hoverBgImage={essentialsImage}
        />
      </FeaturesGrid>
    </Container>
  );
};

export default CardSection;
