import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Box,
  VStack,
  Container,
  Text,
  Input,
  Button,
  HStack,
  useColorModeValue,
  useToast,
  Flex,
} from '@chakra-ui/react';
import c1 from '../../assets/images/h3.png';

const API_URL = import.meta.env.VITE_API_URL;

function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Welcome. I am the one they call Zen Master. How may I assist you on your journey of tranquility today?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const messagesEndRef = useRef(null);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const textColor = useColorModeValue('gray.600', 'white.700');
  const inputBgColor = useColorModeValue('gray.50', 'gray.700');

  // Updated color scheme
  const bgColor = useColorModeValue('white', 'gray.800');
  const userMsgColor = '#d9fdd3';
  const botMsgColor = 'white';

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      const newUserMessage = { sender: 'user', text: inputMessage };
      setMessages(prevMessages => [...prevMessages, newUserMessage]);
      setInputMessage('');
      setIsLoading(true);

      try {
        const response = await axios.post(`${API_URL}chatbot/chat/`, {
          question: inputMessage,
          user_name: userInfo ? userInfo.name : 'friend',
        });

        const newBotMessage = { sender: 'bot', text: response.data.answer };
        setMessages(prevMessages => [...prevMessages, newBotMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
        toast({
          title: 'Error',
          description: 'Failed to get response from the chatbot.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minHeight="calc(100vh - 80px)"
      bg={bgColor}
      // p={4}
    >
      <Container maxW="container.md" py={6}>
        <VStack spacing={4} align="stretch">
          <Text
            fontFamily={'rale'}
            fontSize="2xl"
            fontWeight="400"
            color={textColor}
            textAlign="center"
          >
            Zen Master Welcomes You
          </Text>
          <Box
            height="65vh"
            borderWidth={1}
            borderRadius="lg"
            position="relative"
            overflow="hidden"
            boxShadow="lg"
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              backgroundImage={`url(${c1})`}
              backgroundSize="cover"
              backgroundPosition="center"
              opacity="0.8"
            />
            {/* Semi-transparent overlay */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              // bg={stoneBg}
            />
            {/* Scrollable message area */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              overflowY="auto"
              p={4}
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#A0AEC0',
                  borderRadius: '24px',
                },
              }}
            >
              <VStack spacing={3} align="stretch">
                {messages.map((msg, index) => (
                  <Box
                    key={index}
                    bg={msg.sender === 'user' ? userMsgColor : botMsgColor}
                    p={3}
                    borderRadius="md"
                    alignSelf={
                      msg.sender === 'user' ? 'flex-end' : 'flex-start'
                    }
                    maxW="70%"
                    boxShadow="md"
                  >
                    <Text fontFamily={'body'} fontWeight={400} color="gray.800">
                      {msg.text}
                    </Text>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </VStack>
            </Box>
          </Box>
          <HStack
            as="form"
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            spacing={3}
          >
            <Input
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Free your wandering mind..."
              bg={inputBgColor}
              color={'gray.600'}
              borderColor="gray.300"
              _hover={{ borderColor: 'gray.400' }}
              _focus={{
                borderColor: 'blue.500',
                boxShadow: '0 0 0 1px #4299E1',
              }}
              size="lg"
              flex="1"
            />
            <Button
              type="submit"
              colorScheme="green"
              isLoading={isLoading}
              loadingText="Sending"
              _hover={{ bg: 'green.600' }}
              size="lg"
            >
              Send
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Flex>
  );
}

export default Chat;
