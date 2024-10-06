import { Text } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react'; // Import useColorModeValue

function SaveTheWorldText() {
  const textColor = useColorModeValue('#256142', 'white'); // Earthy green for light mode, lighter green for dark mode

  return (
    <Text
      fontFamily="'Quicksand', sans-serif" // Apply the font
      fontSize={{ base: '3xl', md: '5xl' }} // Responsive font size
      fontWeight="bold" // Make the text bold
      color={textColor} // Dynamic text color based on theme
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
