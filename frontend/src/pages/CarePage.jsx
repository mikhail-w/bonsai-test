import { Card, CardHeader, CardBody, CardFooter, Button } from "@chakra-ui/react";
import { SimpleGrid, Center, Container, Text, Heading } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
const CarePage = () => {
  return (
    <>
      <Container maxW="container.xlg" mt={"100px"} minH={"100vh"}>
        <Center
          flexDirection={"column"}
          marginTop={50}
          marginBottom={100}
          justifyContent={"space-between"}
        >
          <Heading marginBottom={100}>Explore Our Care Instructions.</Heading>

          <SimpleGrid
            spacing={3}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            <Card>
              <CardHeader>
                <Heading size="md">Prepare your Bonsai Tree.</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Before styling your bonsai, there are important preparations
                  to make. 
                </Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md"> Caring your Bonsai Tree.</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Learn the essential tips and tricks for keeping your bonsai
                  tree healthy and thriving. 
                </Text>
              </CardBody>
              <CardFooter>
                <Button>View here</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Heading size="md">Styling Your Bonsai Tree</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Unleash your creativity by learning how to style and shape
                  your bonsai tree. 
                </Text>
              </CardBody>
              <CardFooter>
                 <RouterLink to="/">
                  <Button>View here</Button>
                </RouterLink>
              </CardFooter>
            </Card>
          </SimpleGrid>
        </Center>

        <Center>
          <Text fontFamily={"lato"} fontSize="lg" color="gray.600">
            Discover our wide selection of expertly curated bonsai plants
          </Text>
        </Center>
      </Container>
    </>
  );
};

export default CarePage;
