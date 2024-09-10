import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Image,
} from "@chakra-ui/react";
import { SimpleGrid, Center, Container, Text, Heading } from "@chakra-ui/react";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom"; // Import useLocation
import prepare from "../assets/images/preparing_menu.jpeg";
import care from "../assets/images/caring_menu.jpeg";
import style from "../assets/images/styling_menu.jpeg";

const CarePage = () => {
  const location = useLocation(); // Get the current location

  // Show the CarePage content only if the current path is exactly "/profile/care"
  const isBaseCareRoute = location.pathname === "/profile/care";

  return (
    <>
      <Container maxW="container.xlg" mt={"100px"} minH={"100vh"}>
        {isBaseCareRoute && ( 
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
                <Image src={prepare} />
                <CardBody>
                  <Text>
                    Before styling your bonsai, there are important preparations
                    to make.
                  </Text>
                </CardBody>
                <CardFooter>
                  <RouterLink to="preparing">
                    <Button>View here</Button>
                  </RouterLink>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Heading size="md">Caring your Bonsai Tree.</Heading>
                </CardHeader>
                <Image src={care} />
                <CardBody>
                  <Text>
                    Learn the essential tips and tricks for keeping your bonsai
                    tree healthy and thriving.
                  </Text>
                </CardBody>
                <CardFooter>
                  <RouterLink to="caring">
                    <Button>View here</Button>
                  </RouterLink>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Heading size="md">Styling Your Bonsai Tree</Heading>
                </CardHeader>
                <Image src={style} />
                <CardBody>
                  <Text>
                    Unleash your creativity by learning how to style and shape
                    your bonsai tree.
                  </Text>
                </CardBody>
                <CardFooter>
                  <RouterLink to="styling">
                    <Button>View here</Button>
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
