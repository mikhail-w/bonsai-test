import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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
	Image,
	Flex,
} from "@chakra-ui/react";
import Monstera from "../assets/images/monstera.jpg";

function Chat() {
	const [messages, setMessages] = useState([
		{
			sender: "bot",
			text: "Welcome. I am the one they call Zen Master. How may I assist you on your journey of tranquility today?",
		},
	]);
	const [inputMessage, setInputMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const toast = useToast();
	const messagesEndRef = useRef(null);

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// Updated color scheme
	const bgColor = useColorModeValue("green.50", "green.900");
	const userMsgColor = useColorModeValue("teal.100", "teal.700");
	const botMsgColor = useColorModeValue("green.100", "green.700");
	const stoneBg = useColorModeValue(
		"rgba(255, 255, 255, 0.7)",
		"rgba(0, 0, 0, 0.7)"
	);

	const handleSendMessage = async () => {
		if (inputMessage.trim() !== "") {
			const newUserMessage = { sender: "user", text: inputMessage };
			setMessages((prevMessages) => [...prevMessages, newUserMessage]);
			setInputMessage("");
			setIsLoading(true);

			try {
				const response = await axios.post("/api/chatbot/chat/", {
					question: inputMessage,
					user_name: userInfo ? userInfo.name : "friend",
				});

				const newBotMessage = { sender: "bot", text: response.data.answer };
				setMessages((prevMessages) => [...prevMessages, newBotMessage]);
			} catch (error) {
				console.error("Error sending message:", error);
				toast({
					title: "Error",
					description: "Failed to get response from the chatbot.",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			} finally {
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<Flex
			direction="column"
			align="center"
			justify="center"
			minHeight="calc(100vh - 80px)"
			bg={bgColor}
			p={4}
		>
			<Container maxW="container.lg" py={8}>
				<VStack spacing={6} align="stretch">
					<Text
						fontSize="3xl"
						fontWeight="bold"
						color="green.600"
						textAlign="center"
						mb={4}
					>
						Zen Master Welcomes You
					</Text>
					<Box
						height="60vh"
						borderWidth={1}
						borderRadius="lg"
						boxShadow="xl"
						position="relative"
						overflow="hidden"
					>
						<Box
							position="absolute"
							top="0"
							left="0"
							right="0"
							bottom="0"
							backgroundImage={`url(${Monstera})`}
							backgroundSize="cover"
							backgroundPosition="center"
							opacity="1"
						/>
						{/* Semi-transparent overlay */}
						<Box
							position="absolute"
							top="0"
							left="0"
							right="0"
							bottom="0"
							bg={stoneBg}
						/>
						{/* Scrollable message area */}
						<Box
							position="absolute"
							top="0"
							left="0"
							right="0"
							bottom="0"
							overflowY="auto"
							css={{
								"&::-webkit-scrollbar": {
									width: "4px",
								},
								"&::-webkit-scrollbar-track": {
									width: "6px",
								},
								"&::-webkit-scrollbar-thumb": {
									background: "green.200",
									borderRadius: "24px",
								},
							}}
						>
							<VStack spacing={4} p={6} align="stretch">
								{messages.map((msg, index) => (
									<Box
										key={index}
										bg={msg.sender === "user" ? userMsgColor : botMsgColor}
										p={3}
										borderRadius="lg"
										alignSelf={
											msg.sender === "user" ? "flex-end" : "flex-start"
										}
										maxW="70%"
										boxShadow="md"
									>
										<Text>{msg.text}</Text>
									</Box>
								))}
								<div ref={messagesEndRef} />
							</VStack>
						</Box>
					</Box>
					<HStack
						as="form"
						onSubmit={(e) => {
							e.preventDefault();
							handleSendMessage();
						}}
						spacing={4}
					>
						<Input
							value={inputMessage}
							onChange={(e) => setInputMessage(e.target.value)}
							placeholder="Free your wandering mind..."
							bg="white"
							borderColor="green.300"
							_hover={{ borderColor: "green.400" }}
							_focus={{
								borderColor: "green.500",
								boxShadow: "0 0 0 1px #68D391",
							}}
							size="lg"
						/>
						<Button
							type="submit"
							colorScheme="green"
							isLoading={isLoading}
							loadingText="Sending"
							_hover={{ bg: "green.600" }}
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
