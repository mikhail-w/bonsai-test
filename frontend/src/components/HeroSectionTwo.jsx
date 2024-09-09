import {
    Box,
    Heading,
    Text,
    Button,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { motion } from 'framer-motion';
  import { Canvas } from '@react-three/fiber';
  import Hero from '../assets/images/hero.jpg';
  import MobileHero from '../assets/images/hero-mb.jpg';
  import { useGLTF } from '@react-three/drei'; // Import useGLTF for loading the .glb model
  
  // Bonsairoom component with the provided model data
  function HeroSectionTwo(props) {
    const { nodes, materials } = useGLTF('/bonsairoom.glb'); // Ensure this path is correct
    return (
      <group {...props} dispose={null}>
        <group position={[-6.585, -1.812, -8.559]} rotation={[Math.PI / 2, 0, 0]} scale={5.918}>
          <group rotation={[-Math.PI, 0, 0]} scale={0.01}>
            <group scale={100}>
              <mesh castShadow receiveShadow geometry={nodes.Cube_Bark_0.geometry} material={materials.Bark} />
              <mesh castShadow receiveShadow geometry={nodes.Cube_LeafSet_0.geometry} material={materials.LeafSet} />
              <mesh castShadow receiveShadow geometry={nodes.Cube_Pot_0.geometry} material={materials.material} position={[0.025, -0.001, 0.031]} />
            </group>
          </group>
        </group>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.Object_10.geometry} material={materials.podloga} />
          <mesh castShadow receiveShadow geometry={nodes.Object_11.geometry} material={materials.sciana_okno} />
          <mesh castShadow receiveShadow geometry={nodes.Object_12.geometry} material={materials['stolik.001']} />
          <mesh castShadow receiveShadow geometry={nodes.Object_13.geometry} material={materials['Material.005']} />
          <mesh castShadow receiveShadow geometry={nodes.Object_14.geometry} material={materials['Material.002']} />
          <mesh castShadow receiveShadow geometry={nodes.Object_15.geometry} material={materials['Material.006']} />
          <mesh castShadow receiveShadow geometry={nodes.Object_16.geometry} material={materials['Material.007']} />
          <mesh castShadow receiveShadow geometry={nodes.Object_17.geometry} material={materials.mata} />
          <mesh castShadow receiveShadow geometry={nodes.Object_18.geometry} material={materials.stolik} />
          <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} material={materials['Material.001']} />
          <mesh castShadow receiveShadow geometry={nodes.Object_3.geometry} material={materials['Material.002']} />
          <mesh castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials['Material.003']} />
          <mesh castShadow receiveShadow geometry={nodes.Object_5.geometry} material={materials['Material.004']} />
          <mesh castShadow receiveShadow geometry={nodes.Object_6.geometry} material={materials.krzeslo_1} />
          <mesh castShadow receiveShadow geometry={nodes.Object_7.geometry} material={materials.krzeslo_okno} />
          <mesh castShadow receiveShadow geometry={nodes.Object_8.geometry} material={materials.krzeslo_prawe} />
          <mesh castShadow receiveShadow geometry={nodes.Object_9.geometry} material={materials.krzeslo_srodek} />
        </group>
        <group position={[-11.396, -1.416, 4.924]} rotation={[Math.PI / 2, 0, 0]} scale={6.711}>
          <group rotation={[-Math.PI, 0, 0]} scale={0.01}>
            <group scale={100}>
              <mesh castShadow receiveShadow geometry={nodes.Cube_Bark_0001.geometry} material={materials['Bark.001']} />
              <mesh castShadow receiveShadow geometry={nodes.Cube_LeafSet_0001.geometry} material={materials['LeafSet.001']} />
              <mesh castShadow receiveShadow geometry={nodes.Cube_Pot_0001.geometry} material={materials['material.001']} />
            </group>
          </group>
        </group>
        <group position={[6.202, -1.331, -7.971]} rotation={[Math.PI / 2, 0, 0]} scale={5.633}>
          <group rotation={[-Math.PI, 0, 0]} scale={0.01}>
            <group scale={100}>
              <mesh castShadow receiveShadow geometry={nodes.Cube_Bark_0002.geometry} material={materials['Bark.002']} />
              <mesh castShadow receiveShadow geometry={nodes.Cube_LeafSet_0002.geometry} material={materials['LeafSet.002']} />
              <mesh castShadow receiveShadow geometry={nodes.Cube_Pot_0002.geometry} material={materials['material.002']} />
            </group>
          </group>
        </group>
      </group>
    );
  }
  
  useGLTF.preload('/bonsairoom.glb'); // Preload the model
  
  // Hero Section with Bonsairoom as the 3D background
  const MotionBox = motion(Box);
  const MotionStack = motion(Stack);
  
  function HeroSection() {
    return (
      <Box w="full" h="100vh" position="relative">
        {/* Three.js Canvas with Bonsairoom */}
        <Canvas style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} />
          <Bonsairoom /> {/* The Bonsairoom 3D model is added here */}
        </Canvas>
  
        {/* Background Image (as a fallback for older devices) */}
        <Box
          w="full"
          h="100vh"
          bgImage={{ base: MobileHero, md: Hero }}
          bgSize="cover"
          bgPos="center"
          position="absolute"
          top={0}
          left={0}
          zIndex={-1}
        />
  
        {/* Content Section */}
        <MotionBox
          w="full"
          h="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={8}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          zIndex={1} // Ensuring the text is on top
        >
          <MotionStack
            spacing={6}
            textAlign="center"
            maxW="lg"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Heading
              fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
              color={useColorModeValue('white', 'gray.800')}
              fontWeight="bold"
            >
              Discover Bonsai
            </Heading>
            <Text
              fontSize={{ base: 'md', lg: 'lg' }}
              color={useColorModeValue('whiteAlpha.800', 'gray.300')}
            >
              Explore the tranquility and beauty of nature through our curated
              bonsai collection.
            </Text>
            <Stack direction="row" spacing={4} justifyContent="center">
              <Button
                bg={useColorModeValue('green.400', 'green.600')}
                color="white"
                _hover={{ bg: useColorModeValue('green.500', 'green.700') }}
                size="lg"
                zIndex={1}
              >
                Shop Now
              </Button>
              <Button
                bg={useColorModeValue('gray.600', 'gray.700')}
                color="white"
                _hover={{ bg: useColorModeValue('gray.700', 'gray.800') }}
                size="lg"
                zIndex={1}
              >
                Learn More
              </Button>
            </Stack>
          </MotionStack>
        </MotionBox>
      </Box>
    );
  }
  
  export default HeroSectionTwo;
  