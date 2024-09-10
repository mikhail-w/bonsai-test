import { Box, Image, Flex, Text } from '@chakra-ui/react';
import notFound from '../assets/images/svgs/404.svg';
import BackButton from '../components/BackButton';

function NotFoundPage() {
  return (
    <>
      <BackButton />
      <Flex
        direction="column"
        justify="center"
        align="center"
        height="100vh"
        textAlign="center"
      >
        <Image src={notFound} alt="404 Not Found" />
        <Text fontSize="2xl" fontWeight="bold" mt={4}>
          Page not found!
        </Text>
      </Flex>
      <Box textAlign="center" mt={4}>
        <Text fontSize="lg">Sorry, this page is not available...</Text>
      </Box>
    </>
  );
}

export default NotFoundPage;
