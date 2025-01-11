import { OverlayView } from '@react-google-maps/api';
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Link,
  Icon,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { MapPin, Navigation2, Star } from 'lucide-react';

const MapMarkerInfoWindow = ({
  selectedMarker,
  onMouseEnter,
  onMouseLeave,
}) => {
  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Icon
            key={i}
            as={Star}
            color="yellow.400"
            boxSize={4}
            fill="currentColor"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Box key={i} position="relative" width="16px" height="16px">
            <Icon
              as={Star}
              color="yellow.400"
              boxSize={4}
              fill="currentColor"
              position="absolute"
              clipPath="inset(0 50% 0 0)"
            />
            <Icon
              as={Star}
              color={useColorModeValue('gray.200', 'gray.600')}
              boxSize={4}
              fill="currentColor"
              position="absolute"
            />
          </Box>
        );
      } else {
        stars.push(
          <Icon
            key={i}
            as={Star}
            color={useColorModeValue('gray.200', 'gray.600')}
            boxSize={4}
            fill="currentColor"
          />
        );
      }
    }
    return stars;
  };

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    selectedMarker.address
  )}`;

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const tooltipBg = useColorModeValue('white', 'gray.700');
  const tooltipColor = useColorModeValue('gray.800', 'gray.200');

  return (
    <OverlayView
      position={selectedMarker.position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <Box
        width="300px"
        bg={bgColor}
        color={textColor}
        borderRadius="lg"
        boxShadow="lg"
        overflow="hidden"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        p={4}
      >
        <VStack align="stretch" spacing={0}>
          {/* Image Section */}
          <Image
            src={selectedMarker.photo}
            alt={`${selectedMarker.name} thumbnail`}
            height="128px"
            objectFit="cover"
            width="100%"
          />

          {/* Content Container */}
          <Box>
            {/* Title and Directions */}
            <HStack justify="space-between" align="flex-start" mb={2}>
              <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
                {selectedMarker.name}
              </Text>
              <Tooltip
                label="Get Directions"
                placement="top"
                bg={tooltipBg}
                color={tooltipColor}
              >
                <Link
                  href={directionsUrl}
                  isExternal
                  color="green.400"
                  _hover={{
                    color: 'green.500',
                    transform: 'scale(1.1)',
                  }}
                  transition="all 0.2s"
                  display="block"
                >
                  <Icon as={Navigation2} boxSize={6} />
                </Link>
              </Tooltip>
            </HStack>

            {/* Rating Section */}
            <Box mb={2}>
              <HStack spacing={1} mb={1}>
                <Text fontSize="sm" color={secondaryTextColor}>
                  Rating:
                </Text>
                <HStack spacing={0.5}>
                  {renderStars(selectedMarker.rating)}
                </HStack>
                <Text fontSize="sm" color={secondaryTextColor}>
                  {selectedMarker.rating}
                </Text>
              </HStack>
              <Text fontSize="xs" color={secondaryTextColor}>
                ({selectedMarker.reviewCount} reviews)
              </Text>
            </Box>

            {/* Address */}
            <HStack spacing={2} color={secondaryTextColor}>
              <Icon as={MapPin} boxSize={4} mt={1} flexShrink={0} />
              <Text fontSize="sm">{selectedMarker.address}</Text>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </OverlayView>
  );
};

export default MapMarkerInfoWindow;
