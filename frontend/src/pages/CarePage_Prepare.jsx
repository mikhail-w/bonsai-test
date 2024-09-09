import React from "react";
import {
  Box,
  Divider,
  Center,
  Container,
  Text,
  Heading,
  Image,
} from "@chakra-ui/react";
import Soil from "../assets/images/soil.jpeg";
import Tools from "../assets/images/tools.jpeg";
import Fertilizer from "../assets/images/fertilizer.jpeg";
import Repotting from "../assets/images/repotting.jpeg";

function CarePage_Prepare() {
  return (
    <>
      <Box pos="relative" w="100%" h="500px" overflow="hidden">
        <Image src={Soil} w="100%" h="auto" />
        <Heading
          pos="absolute"
          top={{ md: "50%", base: "30%" }}
          left={{ md: "10%", base: "10%" }}
          color="black"
          sx={{
            WebkitTextStroke: { base: "1px white", md: "none" },
          }}
        >
          Prepare Your Bonsai Tree
        </Heading>
      </Box>

      <Center>
        <Container
          w={{ md: "2000px", sm: "400px" }}
          minH={"100vh"}
          marginTop={"100px"}
        >
          <Heading as="h2" size="lg" mb="4">
            Preparing Your Bonsai Tree for Growth
          </Heading>

          <Text fontFamily="Lato" mb="4">
            Preparing your bonsai tree for healthy growth is essential to ensure
            that it thrives in the environment you provide. This involves
            gathering the right tools, selecting appropriate soil, and
            understanding the needs of your tree. Let's walk through the steps
            to prepare your bonsai tree for a healthy, vibrant life.
          </Text>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Step 1: Gather the Right Tools
          </Heading>

          <Image src={Tools} mb="4"></Image>

          <Text fontFamily="Lato" mt="4" mb="4">
            To care for your bonsai tree, you'll need the right tools. Essential
            tools include sharp pruning shears, wire cutters, a root rake, and a
            watering can with a fine nozzle. These will allow you to prune,
            shape, and water your tree properly.
          </Text>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Step 2: Choosing the Right Soil
          </Heading>

          <Image src={Soil} mb="4"></Image>

          <Text fontFamily="Lato" mt="4" mb="4">
            Bonsai trees require well-draining soil to prevent root rot. A
            typical bonsai soil mix consists of akadama, pumice, and lava rock.
            This blend ensures that your tree’s roots get plenty of oxygen while
            retaining enough moisture for healthy growth. Make sure to choose a
            soil mix suited to your bonsai species.
          </Text>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Step 3: Fertilization
          </Heading>

          <Image src={Fertilizer} mb="4"></Image>

          <Text fontFamily="Lato" mt="4" mb="4">
            Bonsai trees are confined to small pots, so they require regular
            fertilization to receive adequate nutrients. Choose a balanced
            fertilizer with nitrogen, phosphorus, and potassium, and apply it
            during the growing season. Be sure to follow the instructions
            carefully to avoid over-fertilization.
          </Text>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Step 4: Repotting Your Bonsai
          </Heading>

          <Image src={Repotting} mb="4"></Image>

          <Text fontFamily="Lato" mt="4" mb="4">
            Repotting your bonsai tree every 2-3 years ensures healthy root
            growth and prevents the tree from becoming root-bound. Carefully
            remove the tree from its pot, prune the roots, and place it in fresh
            bonsai soil. Make sure to anchor the tree securely in its pot to
            allow proper growth.
          </Text>

          <Divider my="6" />

          <Heading as="h2" size="lg" mb="4">
            Final Thoughts on Preparing Your Bonsai Tree
          </Heading>

          <Text fontFamily="Lato" mt="4" mb="4">
            Preparing your bonsai tree for healthy growth is a rewarding
            process. By gathering the right tools, using the proper soil,
            fertilizing regularly, and repotting when necessary, you'll ensure
            that your bonsai has the best chance to thrive. With proper care and
            attention, your bonsai will grow into a miniature masterpiece that
            reflects the beauty of nature.
          </Text>
        </Container>
      </Center>
    </>
  );
}

export default CarePage_Prepare;
