import React from 'react';
import {
  Box,
  Text,
  VStack,
  Avatar,
  Link,
  Flex,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { FaLinkedin } from 'react-icons/fa';
import CustomHeading from '../components/CustomHeading';
import t1 from '../assets/images/team/mikhail.png';
import t2 from '../assets/images/team/daniel.jpg';
import t3 from '../assets/images/team/dustin.png';
import t4 from '../assets/images/team/gary.jpg';
import t5 from '../assets/images/team/momo.jpg';
import watermark from '../assets/images/logo.png'; // Replace with your uploaded watermark file

const teamMembers = [
  {
    name: 'Mikhail Waddell',
    role: 'Full Stack Developer',
    description:
      'Passionate about leading teams to craft beautiful and responsive web interfaces that deliver exceptional user experiences.',
    linkedIn: 'https://www.linkedin.com/in/mikhail-waddell',
    image: t1,
  },
  {
    name: 'Daniel Phanachone',
    role: 'Full Stack Developer',
    description:
      'Combines frontend and backend expertise for seamless solutions.',
    linkedIn: 'https://www.linkedin.com/in/phanachone',
    image: t2,
  },
  {
    name: 'Dustin Siebold',
    role: 'Full Stack Developer',
    description:
      'Skilled in leveraging AI technologies to develop intelligent chatbots that enhance user experiences through natural language processing and seamless interactions.',
    linkedIn: 'https://www.linkedin.com/in/dustinsiebold',
    image: t3,
  },
  {
    name: 'Gary Dunnington',
    role: 'Full Stack Developer',
    description:
      'Proficient in creating and rendering immersive 3D designs with precision and attention to detail.',
    linkedIn: 'https://www.linkedin.com/in/garydunnington',
    image: t4,
  },
  {
    name: 'Mourad Mourad',
    role: 'Full Stack Developer',
    description: 'Loves building scalable and efficient backend solutions.',
    linkedIn:
      'https://www.linkedin.com/in/mourad-mourad-ba93aa314?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BjJs8QWxnRlGWJiA3sAOtBw%3D%3D',
    image: t5,
  },
];

const AboutPage = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardShadow = useColorModeValue('md', 'lg');
  const cardTextColor = useColorModeValue('gray.700', 'gray.200');
  const cardRoleColor = useColorModeValue('gray.500', 'gray.400');
  const linkHoverColor = useColorModeValue('teal.600', 'teal.300');

  return (
    <Box position="relative" minHeight="150vh" bg={bgColor}>
      <Box py={10} px={5}>
        <CustomHeading
          color={useColorModeValue('green.600', '#32CD32')}
          mt={100}
          size="2xl"
          textAlign="center"
          mb={10}
        >
          Meet Our Team
        </CustomHeading>

        <Flex
          wrap="wrap"
          justifyContent="center"
          gap={10}
          maxW="1200px"
          mx="auto"
          mb={20} // Add margin bottom to create space for watermark
        >
          {/* Team member cards with higher z-index */}
          {teamMembers.map((member, index) => (
            <VStack
              key={index}
              bg={cardBg}
              shadow={cardShadow}
              borderRadius="lg"
              p={5}
              spacing={4}
              align="center"
              w="300px"
              position="relative"
              zIndex={1}
              transition="transform 0.2s, box-shadow 0.2s"
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: 'xl',
              }}
            >
              <Avatar size="xl" src={member.image} name={member.name} />
              <Text fontWeight="bold" fontSize="lg" color={cardTextColor}>
                {member.name}
              </Text>
              <Text fontSize="sm" color={cardRoleColor}>
                {member.role}
              </Text>
              <Text textAlign="center" fontSize="sm" color={cardTextColor}>
                {member.description}
              </Text>
              <Link
                href={member.linkedIn}
                isExternal
                color="teal.500"
                _hover={{ color: linkHoverColor }}
              >
                <FaLinkedin size={24} />
              </Link>
            </VStack>
          ))}
        </Flex>

        {/* Watermark Container */}
        <Box
          position="absolute"
          top={0}
          right={0}
          width="600px"
          height="100%"
          overflow="hidden"
          pointerEvents="none"
          zIndex={0}
        >
          <Image
            src={watermark}
            alt="Watermark"
            position="fixed"
            top={{ base: '80%', md: '80%' }}
            right={10}
            transform={{
              base: 'translateY(-50%) translateX(30%)',
              md: 'translateY(-50%) ',
            }}
            width={{ base: '80%', md: '30%' }}
            height="auto"
            objectFit="contain"
            opacity={0.1}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AboutPage;
