import { InfoWindow } from '@react-google-maps/api';
import {
  HStack,
  VStack,
  Text,
  Image,
  IconButton,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FaStar, FaDirections } from 'react-icons/fa';

const MapMarkerInfoWindow = ({
  selectedMarker,
  onMouseEnter,
  onMouseLeave,
}) => {
  const renderStars = rating => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<Icon as={FaStar} color="yellow.500" boxSize="3" key={i} />);
    }
    return stars;
  };

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    selectedMarker.address
  )}`;

  return (
    <InfoWindow
      position={selectedMarker.position}
      options={{
        disableAutoPan: true,
        pixelOffset: new window.google.maps.Size(0, -90),
      }}
      onCloseClick={null} // Disable the close button
    >
      <VStack
        align="start"
        spacing={1}
        width="300px"
        height="230px"
        p={0}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Image Section */}
        <Image
          src={selectedMarker.photo}
          alt={`${selectedMarker.name} thumbnail`}
          width="100%" // Make the image fill the full width of the container
          height="100px"
          objectFit="cover"
          borderTopRadius="0" // Remove border-radius to make the image touch the top border
          marginTop="0" // Ensure no margin at the top
        />

        {/* Title and Directions Button */}
        <HStack
          justifyContent="space-between"
          width="100%"
          p={0}
          pt={1}
          // boxShadow={'outline'}
        >
          <Text
            fontWeight="bold"
            fontSize="md"
            noOfLines={1}
            fontFamily="rale"
            isTruncated
            maxWidth="70%" // Limit the text width to 70% of the container
            display="inline-block" // Ensures the text block respects its width
            whiteSpace="nowrap" // Prevents text from wrapping to the next line
            overflow="hidden" // Ensures overflow text is hidden
            textOverflow="ellipsis" // Adds ellipsis (...) at the end of the truncated text
          >
            {selectedMarker.name}
          </Text>
          <IconButton
            icon={<FaDirections />}
            size="lg"
            variant="ghost"
            colorScheme="green"
            aria-label="Get Directions"
            as="a"
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            position="absolute"
            right={4}
            transition="transform 0.2s" // Smooth transition effect
            _hover={{
              transform: 'scale(1.5)', // Increase the size to 150% on hover
            }}
          />
        </HStack>

        {/* Rating Section */}
        <HStack spacing={0.5}>
          <Text>Rating: </Text>
          {renderStars(selectedMarker.rating)}
          <Text>{selectedMarker.rating}</Text>
        </HStack>
        <Text fontSize="xs" color="gray.500">
          ({selectedMarker.reviewCount}) reviews
        </Text>
        <Text>{selectedMarker.address}</Text>
      </VStack>
    </InfoWindow>
  );
};

export default MapMarkerInfoWindow;
