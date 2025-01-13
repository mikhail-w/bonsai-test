import React from 'react';
import { Heading as ChakraHeading, useColorModeValue } from '@chakra-ui/react';

const CustomHeading = ({
  children,
  fontFamily = 'lato',
  as = 'h2',
  size = ['md', 'lg', 'xl', '2xl'],
  mb = 12,
  padding = '50px',
  fontWeight = '300',
  color = useColorModeValue('green.600', 'white'),

  textTransform = 'uppercase',
  ...rest
}) => {
  return (
    <ChakraHeading
      fontFamily={fontFamily}
      as={as}
      size={size}
      mb={mb}
      padding={padding}
      fontWeight={fontWeight}
      color={color}
      textTransform={textTransform}
      textAlign="center"
      {...rest}
    >
      {children}
    </ChakraHeading>
  );
};

export default CustomHeading;
