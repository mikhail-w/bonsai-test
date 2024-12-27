import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import {
  Box,
  Divider,
  Center,
  Container,
  Text,
  Heading,
  Image,
  UnorderedList,
  ListItem,
  Button,
} from '@chakra-ui/react';
import Water_Bonsai from '../assets/images/watering_bonsai.jpg';
import Chokkan from '../assets/images/chokkan.jpeg';
import Moyogi from '../assets/images/moyogi.jpeg';
import Shakan from '../assets/images/shakan.jpeg';
import Kengai from '../assets/images/kengai.jpeg';
import HanKengai from '../assets/images/hankengai.png';
import Pruning from '../assets/images/pruning.jpg';
import Wiring from '../assets/images/wiring.jpeg';
import Thinning from '../assets/images/thinning.jpeg';
import Defoliation from '../assets/images/defoliation.jpeg';
import Pots from '../assets/images/pots.jpeg';
import Balance from '../assets/images/balance.jpeg';
import Vision from '../assets/images/vision.jpeg';

function CarePage_Style() {
  return (
    <>
      <Box pos="relative" w="100%" h="500px" overflow="hidden">
        <Image src={Water_Bonsai} w="100%" h="auto" />
        <Heading
          pos="absolute"
          top={{ md: '50%', base: '30%' }}
          left={{ md: '10%', base: '10%' }}
          color="black"
          sx={{
            WebkitTextStroke: { base: '1px white', md: 'none' },
          }}
        >
          Styling Your Bonsai Tree
        </Heading>
      </Box>

      <Center>
        <Container
          w={{ md: '2000px', sm: '400px' }}
          minH={'100vh'}
          marginTop={'100px'}
        >
          <Heading as="h2" size="lg" mb="4">
            Understanding Bonsai Styles
          </Heading>

          <Text fontFamily="Lato" mb="4">
            Bonsai trees come in various styles, each representing different
            aspects of natural tree growth. Understanding the basic styles can
            help you decide how you want your bonsai to look. Here are a few of
            the most popular styles:
          </Text>

          <UnorderedList spacing="3" mb="6">
            <Image src={Chokkan} mb="4"></Image>
            <ListItem>
              <Text fontFamily="Lato">
                <strong>Formal Upright (Chokkan):</strong> A perfectly straight
                trunk with symmetrical branches, mimicking trees in the open.
              </Text>
            </ListItem>
            <Image src={Moyogi} mb="4"></Image>
            <ListItem>
              <Text fontFamily="Lato">
                <strong>Informal Upright (Moyogi):</strong> A trunk with gentle
                curves, mimicking trees in forests or mountainous areas.
              </Text>
            </ListItem>
            <Image src={Shakan} mb="4"></Image>
            <ListItem>
              <Text fontFamily="Lato">
                <strong>Slanting (Shakan):</strong> A trunk slanted at an angle,
                as if affected by wind or steep slopes.
              </Text>
            </ListItem>
            <Image src={Kengai} mb="4"></Image>
            <ListItem>
              <Text fontFamily="Lato">
                <strong>Cascade (Kengai):</strong> The trunk grows downward, as
                though hanging over a cliff.
              </Text>
            </ListItem>
            <Image src={HanKengai} mb="4"></Image>
            <ListItem>
              <Text fontFamily="Lato">
                <strong>Semi-Cascade (Han-Kengai):</strong> A less extreme
                version of the cascade, where the trunk grows slightly downward.
              </Text>
            </ListItem>
          </UnorderedList>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Essential Bonsai Styling Techniques
          </Heading>

          <Text fontFamily="Lato" mb="4">
            Styling a bonsai is about manipulating its growth in a way that
            mimics full-sized trees in nature. Here are the key techniques used
            to style a bonsai tree:
          </Text>

          <Heading as="h3" size="md" mb="2">
            1. Pruning
          </Heading>
          <Image src={Pruning} mb="4"></Image>
          <Text fontFamily="Lato" mt="4" mb="4">
            Pruning controls the overall shape and size of the tree. Maintenance
            pruning trims new growth to maintain the tree’s compact shape, while
            structural pruning removes larger branches to create a specific
            form.
          </Text>

          <Heading as="h3" size="md" mb="2">
            2. Wiring
          </Heading>
          <Image src={Wiring} mb="4"></Image>
          <Text fontFamily="Lato" mt="4" mb="4">
            Wiring bends branches into specific positions, creating elegant
            curves. Be sure to remove the wire before it cuts into the bark,
            once the branch has set in its new position.
          </Text>

          <Heading as="h3" size="md" mb="2">
            3. Thinning
          </Heading>
          <Image src={Thinning} mb="4"></Image>
          <Text fontFamily="Lato" mt="4" mb="4">
            Thinning involves removing overcrowded branches to improve balance
            and ensure light reaches all parts of the tree.
          </Text>

          <Heading as="h3" size="md" mb="2">
            4. Defoliation
          </Heading>
          <Image src={Defoliation} mb="4"></Image>
          <Text fontFamily="Lato" mt="4" mb="4">
            Defoliation removes leaves to encourage smaller foliage and redirect
            energy. Only use this technique on species that can handle it.
          </Text>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Choosing the Right Pot and Placement
          </Heading>

          <Image src={Pots} mb="4"></Image>

          <Text fontFamily="Lato" mt="4" mb="4">
            The pot’s color, size, and shape should complement the tree’s
            design. Ensure the pot has adequate drainage and room for root
            growth, and choose shapes that enhance the style of your bonsai.
          </Text>

          <Text as="u">Check out our Pot selection on our store.</Text>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Balance and Symmetry in Bonsai Design
          </Heading>
          <Image src={Balance} mb="4"></Image>
          <Text fontFamily="Lato" mt="4" mb="4">
            Bonsai styling involves balancing the overall composition, including
            front and back views, branch placement, and visual weight. Achieving
            this creates a harmonious look.
          </Text>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Patience and Long-Term Vision
          </Heading>
          <Image src={Vision} mb="4"></Image>
          <Text fontFamily="Lato" mt="4" mb="4">
            Bonsai styling is a long-term process. Each pruning session, wiring
            adjustment, and styling decision should be made with the tree’s
            future shape in mind. With patience, your bonsai will grow into a
            beautiful, artistic expression of nature.
          </Text>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Final Thoughts on Styling Your Bonsai
          </Heading>
          <Text fontFamily="Lato" mt="4" mb="4">
            Styling a bonsai tree is a rewarding journey combining horticulture
            and art. By mastering techniques like pruning and wiring, and
            keeping balance and harmony in mind, you’ll create a living
            masterpiece. Enjoy the process, and let your creativity shine
            through as your bonsai evolves over time.
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
          </Center>
        </Container>
      </Center>
    </>
  );
}

export default CarePage_Style;
