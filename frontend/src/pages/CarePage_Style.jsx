import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@chakra-ui/react";
import { Box, Divider, SimpleGrid, ListItem, UnorderedList, Center, Container, Text, Heading, Image} from "@chakra-ui/react";
import Water_Bonsai from "../assets/images/watering_bonsai.jpg";
import Chokkan from "../assets/images/chokkan.jpeg";
import Moyogi from "../assets/images/moyogi.jpeg";
import Shakan from "../assets/images/shakan.jpeg";
import Kengai from "../assets/images/kengai.jpeg";
import HanKengai from "../assets/images/hankengai.jpeg"
import Pruning from "../assets/images/pruning.jpeg";
import Wiring from "../assets/images/wiring.jpeg";
import Thinning from "../assets/images/thinning.jpeg";
import Defoliation from "../assets/images/defoliation.jpeg";
import Pots from "../assets/images/pots.jpeg"
import Balance from "../assets/images/balance.jpeg"
//lato rail
import Vision from "../assets/images/vision.jpeg"
function CarePage_Style () {
   return (
     <>
       <Box pos="relative" w="100%" h="500px" overflow="hidden">
         <Image src={Water_Bonsai} w="100%" h="auto" />
         <Heading
           pos="absolute"
           top={{ md: "50%", base: "30%" }}
           left={{ md: "10%", base: "10%" }}
           color="black"
           sx={{
             WebkitTextStroke: { base: "1px white", md: "none" }, // Text stroke for base, none for md
           }}
         >
           Styling Your Bonsai Tree
         </Heading>
       </Box>

       <Center>
         <Container
           w={{ md: "2000px", sm: "400px" }}
           minH={"100vh"}
           marginTop={"100px"}
         >
           <Heading as="h2" size="lg" mb="4">
             Understanding Bonsai Styles
           </Heading>

           <Text fontFamily="lato" mb="4">
             Bonsai trees come in various styles, each representing different
             aspects of natural tree growth. Understanding the basic styles can
             help you decide how you want your bonsai to look. Here are a few of
             the most popular styles:
           </Text>

           <UnorderedList spacing="3" mb="6">
             <Image src={Chokkan}></Image>
             <ListItem>
               <strong>Formal Upright (Chokkan):</strong> A perfectly straight
               trunk with symmetrical branches, mimicking trees in the open.
             </ListItem>
             <Image src={Moyogi}></Image>
             <ListItem>
               <strong>Informal Upright (Moyogi):</strong> A trunk with gentle
               curves, mimicking trees in forests or mountainous areas.
             </ListItem>
             <Image src={Shakan}></Image>
             <ListItem>
               <strong>Slanting (Shakan):</strong> A trunk slanted at an angle,
               as if affected by wind or steep slopes.
             </ListItem>
             <Image src={Kengai}></Image>
             <ListItem>
               <strong>Cascade (Kengai):</strong> The trunk grows downward, as
               though hanging over a cliff.
             </ListItem>
             <Image src={HanKengai}></Image>
             <ListItem>
               <strong>Semi-Cascade (Han-Kengai):</strong> A less extreme
               version of the cascade, where the trunk grows slightly downward.
             </ListItem>
           </UnorderedList>

           <Divider my="6" />

           <Heading as="h2" size="lg" mb="4">
             Essential Bonsai Styling Techniques
           </Heading>

           <Text mb="4">
             Styling a bonsai is about manipulating its growth in a way that
             mimics full-sized trees in nature. Here are the key techniques used
             to style a bonsai tree:
           </Text>

           <Heading as="h3" size="md" mb="2">
             1. Pruning
           </Heading>
           <Image src={Pruning}></Image>
           <Text mb="4">
             Pruning controls the overall shape and size of the tree.
             Maintenance pruning trims new growth to maintain the tree’s compact
             shape, while structural pruning removes larger branches to create a
             specific form.
           </Text>

           <Heading as="h3" size="md" mb="2">
             2. Wiring
           </Heading>
           <Image src={Wiring}></Image>
           <Text mb="4">
             Wiring bends branches into specific positions, creating elegant
             curves. Be sure to remove the wire before it cuts into the bark,
             once the branch has set in its new position.
           </Text>

           <Heading as="h3" size="md" mb="2">
             3. Thinning
           </Heading>
           <Image src={Wiring}></Image>
           <Text mb="4">
             Thinning involves removing overcrowded branches to improve balance
             and ensure light reaches all parts of the tree.
           </Text>

           <Heading as="h3" size="md" mb="2">
             4. Defoliation
           </Heading>
           <Image src={Defoliation}></Image>
           <Text mb="4">
             Defoliation removes leaves to encourage smaller foliage and
             redirect energy. Only use this technique on species that can handle
             it.
           </Text>

           <Divider my="6" />

           <Heading as="h2" size="lg" mb="4">
             Choosing the Right Pot and Placement
           </Heading>

           <Image src={Pots}></Image>

           <Text mb="4">
             The pot’s color, size, and shape should complement the tree’s
             design. Ensure the pot has adequate drainage and room for root
             growth, and choose shapes that enhance the style of your bonsai.
           </Text>

           <Text as="u">Check out our Pot selection on our store.</Text>

           <Divider my="6" />

           <Heading as="h2" size="lg" mb="4">
             Balance and Symmetry in Bonsai Design
           </Heading>
           <Image src={Balance}></Image>
           <Text mb="4">
             Bonsai styling involves balancing the overall composition,
             including front and back views, branch placement, and visual
             weight. Achieving this creates a harmonious look.
           </Text>

           <Divider my="6" />

           <Heading as="h2" size="lg" mb="4">
             Patience and Long-Term Vision
           </Heading>
           <Image src={Vision}></Image>
           <Text mb="4">
             Bonsai styling is a long-term process. Each pruning session, wiring
             adjustment, and styling decision should be made with the tree’s
             future shape in mind. With patience, your bonsai will grow into a
             beautiful, artistic expression of nature.
           </Text>

           <Divider my="6" />

           <Heading as="h2" size="lg" mb="4">
             Final Thoughts on Styling Your Bonsai
           </Heading>
           <Text mb="4">
             Styling a bonsai tree is a rewarding journey combining horticulture
             and art. By mastering techniques like pruning and wiring, and
             keeping balance and harmony in mind, you’ll create a living
             masterpiece. Enjoy the process, and let your creativity shine
             through as your bonsai evolves over time.
           </Text>
         </Container>
       </Center>
     </>
   );
};

export default CarePage_Style