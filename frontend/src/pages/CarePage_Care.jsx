import React from 'react';
import { FaHome, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  Box,
  Divider,
  Center,
  Container,
  Text,
  Heading,
  Image,
  Button,
} from '@chakra-ui/react';
import Watering from '../assets/images/watering.jpeg';
import Sunlight from '../assets/images/sunlight.jpeg';
import Pruning from '../assets/images/pruning.jpg';
import Protection from '../assets/images/protection.jpeg';

function CarePage_Care() {
  return (
    <>
      <Box pos="relative" w="100%" h="500px" overflow="hidden">
        <Image src={Watering} w="100%" h="auto" />
        <Heading
          pos="absolute"
          top={{ md: '50%', base: '30%' }}
          left={{ md: '10%', base: '10%' }}
          color="black"
          sx={{
            WebkitTextStroke: { base: '1px white', md: 'none' },
          }}
        >
          Caring for Your Bonsai Tree
        </Heading>
      </Box>

      <Center>
        <Container
          w={{ md: '2000px', sm: '400px' }}
          minH={'100vh'}
          marginTop={'100px'}
        >
          <Heading as="h2" size="lg" mb="4">
            Essential Tips for Caring for Your Bonsai Tree
          </Heading>

          <Text fontFamily="Lato" mb="4">
            Caring for a bonsai tree involves more than just watering it
            occasionally. To maintain its health and beauty, it requires proper
            care, attention, and patience. Below are some essential tips to
            ensure your bonsai tree remains healthy and thrives for years to
            come.
          </Text>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Step 1: Watering Your Bonsai Tree
          </Heading>

          <Image src={Watering} mb="4"></Image>

          <Text fontFamily="Lato" mt="4" mb="4">
            Watering is one of the most important aspects of bonsai care. The
            frequency of watering depends on the tree species, pot size, and
            environmental conditions. Ensure the soil is slightly moist, not
            soaking wet or completely dry. Water your bonsai when the topsoil
            feels dry to the touch, ensuring that water reaches the roots
            thoroughly.
          </Text>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Step 2: Providing the Right Amount of Sunlight
          </Heading>

          <Image src={Sunlight} mb="4"></Image>

          <Text fontFamily="Lato" mt="4" mb="4">
            Bonsai trees need sufficient sunlight to thrive. Most species prefer
            several hours of indirect sunlight, but this depends on the tree
            type. Place your bonsai in a well-lit area, but avoid direct
            sunlight that could scorch the leaves. Indoor bonsai may need to be
            rotated to receive light evenly.
          </Text>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Step 3: Pruning and Shaping
          </Heading>

          <Image src={Pruning} mb="4"></Image>

          <Text fontFamily="Lato" mt="4" mb="4">
            Regular pruning helps maintain the shape of your bonsai tree. Prune
            back new shoots that extend beyond the desired canopy size to keep
            its compact form. Structural pruning, which involves removing larger
            branches, should be done in early spring or late fall, while
            maintenance pruning can be done throughout the growing season.
          </Text>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Step 4: Protecting Your Bonsai Tree from Pests and Diseases
          </Heading>

          <Image src={Protection} mb="4"></Image>

          <Text fontFamily="Lato" mt="4" mb="4">
            Bonsai trees, like all plants, can be susceptible to pests and
            diseases. Regularly inspect your tree for signs of aphids, spider
            mites, or fungal infections. Use organic pesticides or neem oil to
            treat infestations and trim off affected leaves or branches to
            prevent the spread of diseases.
          </Text>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Final Thoughts on Caring for Your Bonsai Tree
          </Heading>

          <Text fontFamily="Lato" mt="4" mb="4">
            Caring for your bonsai tree is a rewarding journey that requires
            dedication and attention. By following these essential care
            tips—proper watering, adequate sunlight, regular pruning, and pest
            protection—you can keep your bonsai healthy and thriving for years
            to come. Enjoy the process of nurturing your bonsai, and watch it
            grow into a stunning, miniature representation of nature.
          </Text>
          <Center>
            <Link to="/profile/care">
              <Button
                marginTop={10}
                marginBottom={10}
                marginRight={10}
                colorScheme="green"
              >
                <FaHome />
                Home
              </Button>
            </Link>

            <Link to="/profile/care/styling">
              <Button marginTop={10} marginBottom={10} colorScheme="green">
                Styling Your Bonsai
                <FaArrowRight />
              </Button>
            </Link>
          </Center>
        </Container>
      </Center>
    </>
  );
}

export default CarePage_Care;
