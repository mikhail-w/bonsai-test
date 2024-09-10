import { Text } from '@chakra-ui/react';

function SaveTheWorldText() {
  return (
    <Text
      fontFamily="'Quicksand', sans-serif" // Apply the font
      fontSize={{ base: '3xl', md: '5xl' }} // Responsive font size
      fontWeight="bold" // Make the text bold
      color="#256142" // Earthy green color
      textAlign="center" // Center align text
      lineHeight="1.2" // Adjust line height for better readability
      letterSpacing="wide" // Increase letter spacing for a more relaxed feel
      px={4} // Add padding for mobile
      mt={8} // Add margin on top
    >
      Save the World, plant a tree
    </Text>
  );
}

export default SaveTheWorldText;
