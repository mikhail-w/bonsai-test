import React from 'react';
import {
  Flex,
  HStack,
  Box,
  Button,
  Icon,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { FaCube, FaArrowsAlt } from 'react-icons/fa';
import ThreeDModelViewer from '../3DModel/ThreeDModelViewer';

const ProductButtons = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isQrOpen,
    onOpen: onQrOpen,
    onClose: onQrClose,
  } = useDisclosure();

  return (
    <>
      <Flex justifyContent="center" my={6} maxW="370px">
        <HStack spacing={4} w="100%">
          <Box
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            p={3}
            textAlign="center"
            flex="1"
            h="80px"
            cursor="pointer"
            _hover={{ boxShadow: 'lg' }}
          >
            <Button variant="unstyled" onClick={onOpen} h="100%" w="100%">
              <Flex direction="column" align="center" justify="center" h="100%">
                <Icon as={FaCube} boxSize={5} mb={1} />
                <Text fontSize="sm">See this item in 3D</Text>
              </Flex>
            </Button>
          </Box>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            p={3}
            textAlign="center"
            flex="1"
            h="80px"
            cursor="pointer"
            _hover={{ boxShadow: 'lg' }}
          >
            <Button variant="unstyled" onClick={onQrOpen} h="100%" w="100%">
              <Flex direction="column" align="center" justify="center" h="100%">
                <Icon as={FaArrowsAlt} boxSize={5} mb={1} />
                <Text fontSize="sm">See it in your space</Text>
              </Flex>
            </Button>
          </Box>
        </HStack>
      </Flex>
      {/* 3D Model Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent top="10%">
          <ModalHeader>3D Model Viewer</ModalHeader>
          <ModalCloseButton />
          <ModalBody h="500px" overflowY="scroll">
            <ThreeDModelViewer />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* QR Code Modal */}
      <Modal isOpen={isQrOpen} onClose={onQrClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scan to See in Augmented Reality</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src="https://www.echo3d.com/qrcode" alt="QR Code" />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={onQrClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductButtons;
