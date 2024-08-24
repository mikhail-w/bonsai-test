// src/components/Features.js
import React from 'react';
import styled from 'styled-components';
import { FaLeaf, FaSeedling, FaTree } from 'react-icons/fa';

const FeaturesContainer = styled.section`
  padding: 4rem 2rem;
  text-align: center;
`;

const FeaturesTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
`;

const FeaturesGrid = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Feature = styled.div`
  max-width: 300px;
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: #4caf50;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

const Features = () => (
  <FeaturesContainer>
    <FeaturesTitle>Why Choose Our Plants?</FeaturesTitle>
    <FeaturesGrid>
      <Feature>
        <FeatureIcon>
          <FaLeaf />
        </FeatureIcon>
        <FeatureTitle>Expertly Curated</FeatureTitle>
        <FeatureDescription>
          Each plant is carefully selected for its beauty and health.
        </FeatureDescription>
      </Feature>
      <Feature>
        <FeatureIcon>
          <FaSeedling />
        </FeatureIcon>
        <FeatureTitle>Thrives Indoors</FeatureTitle>
        <FeatureDescription>
          Perfectly suited for indoor environments, bringing nature closer to
          you.
        </FeatureDescription>
      </Feature>
      <Feature>
        <FeatureIcon>
          <FaTree />
        </FeatureIcon>
        <FeatureTitle>Long-lasting</FeatureTitle>
        <FeatureDescription>
          Our plants are nurtured to last for years, with proper care.
        </FeatureDescription>
      </Feature>
    </FeaturesGrid>
  </FeaturesContainer>
);

export default Features;
