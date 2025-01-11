import { Box } from '@chakra-ui/react';

const MobilePaginator = ({ currentSlide, totalSlides }) => {
  const progressWidth = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <Box
      position="absolute"
      bottom="4"
      left="50%"
      transform="translateX(-50%)"
      width="100px"
      height="2px"
      bg="gray.200"
      borderRadius="full"
      overflow="hidden"
    >
      <Box
        height="full"
        bg="green.500"
        width={`${progressWidth}%`}
        transition="width 0.3s ease"
      />
    </Box>
  );
};
export default MobilePaginator;
