import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from '@chakra-ui/react';
import { SimpleGrid, Center, Container, Text, Heading } from '@chakra-ui/react';
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import prepare from '../assets/images/preparing_menu.jpeg';
import care from '../assets/images/caring_menu.jpeg';
import style from '../assets/images/styling_menu.jpeg';

const CarePage = () => {
  const location = useLocation();

  const isBaseCareRoute = location.pathname === '/profile/care';

  return (
    <>
      <Container maxW="container.xl" minH="100vh" py={10}>
        {isBaseCareRoute && (
          <Center flexDirection="column">
            <Heading
              fontFamily="rale"
              fontWeight={400}
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              textAlign="center"
              mb={10}
              color="green.700"
            >
              Explore Our Bonsai Care Instructions
            </Heading>

            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              spacing={6}
              w="full"
              maxW="1000px"
              mx="auto"
              px={4}
            >
              <Card boxShadow="lg" borderRadius="md" overflow="hidden">
                <CardHeader>
                  <Heading
                    fontFamily="rale"
                    size="md"
                    textAlign="center"
                    minHeight="70px" // Set a fixed minimum height for headings
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    Prepare Your Bonsai Tree
                  </Heading>
                </CardHeader>
                <Image src={prepare} objectFit="cover" />
                <CardBody>
                  <Text fontFamily="Lato" textAlign="center">
                    Before styling your bonsai, there are important preparations
                    to make.
                  </Text>
                </CardBody>
                <CardFooter justifyContent="center">
                  <RouterLink to="preparing">
                    <Button fontFamily="Lato" colorScheme="green" size="sm">
                      View here
                    </Button>
                  </RouterLink>
                </CardFooter>
              </Card>

              <Card boxShadow="lg" borderRadius="md" overflow="hidden">
                <CardHeader>
                  <Heading
                    fontFamily="rale"
                    size="md"
                    textAlign="center"
                    minHeight="70px" // Ensure consistent height
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    Caring for Your Bonsai Tree
                  </Heading>
                </CardHeader>
                <Image src={care} objectFit="cover" />
                <CardBody>
                  <Text fontFamily="Lato" textAlign="center">
                    Learn the essential tips and tricks for keeping your bonsai
                    tree healthy and thriving.
                  </Text>
                </CardBody>
                <CardFooter justifyContent="center">
                  <RouterLink to="caring">
                    <Button fontFamily="Lato" colorScheme="green" size="sm">
                      View here
                    </Button>
                  </RouterLink>
                </CardFooter>
              </Card>

              <Card boxShadow="lg" borderRadius="md" overflow="hidden">
                <CardHeader>
                  <Heading
                    fontFamily="rale"
                    size="md"
                    textAlign="center"
                    minHeight="70px" // Ensure consistent height
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    Styling Your Bonsai Tree
                  </Heading>
                </CardHeader>
                <Image src={style} objectFit="cover" />
                <CardBody>
                  <Text fontFamily="Lato" textAlign="center">
                    Unleash your creativity by learning how to style and shape
                    your bonsai tree.
                  </Text>
                </CardBody>
                <CardFooter justifyContent="center">
                  <RouterLink to="styling">
                    <Button fontFamily="Lato" colorScheme="green" size="sm">
                      View here
                    </Button>
                  </RouterLink>
                </CardFooter>
              </Card>
            </SimpleGrid>
          </Center>
        )}
        <Outlet />
      </Container>
    </>
  );
};

export default CarePage;
