import os
from typing import List, Dict, Any
from dataclasses import dataclass
from datetime import datetime

from langchain.chat_models import ChatOpenAI
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.schema import Document
from langchain.text_splitter import CharacterTextSplitter
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
import openai
from openai.error import OpenAIError  # Correct import for OpenAI errors

import wikipedia
from django.conf import settings

# Configure OpenAI client globally
openai.api_key = settings.OPENAI_API_KEY


@dataclass
class Message:
    """Represents a single message in the conversation"""

    role: str
    content: str
    timestamp: datetime


class ConversationHistory:
    """Manages conversation history with a fixed-size buffer"""

    def __init__(self, max_messages: int = 10):
        self.messages: List[Message] = []
        self.max_messages = max_messages
        self.memory = ConversationBufferMemory(
            memory_key="chat_history", return_messages=True
        )

    def add_message(self, role: str, content: str):
        message = Message(role=role, content=content, timestamp=datetime.now())
        self.messages.append(message)
        if len(self.messages) > self.max_messages:
            self.messages = self.messages[-self.max_messages :]
        self.memory.chat_memory.add_message(role, content)

    def get_context(self, last_n: int = None) -> str:
        messages = self.messages[-last_n:] if last_n else self.messages
        return "\n".join(
            [f"{msg.role.capitalize()}: {msg.content}" for msg in messages]
        )


class ModernChatbot:
    """Enhanced chatbot with conversation memory and knowledge retrieval"""

    def __init__(self):
        """Initialize the chatbot with all necessary components"""
        print("Initializing modern chatbot system...")

        # Initialize OpenAI components with explicit configuration
        self.llm = ChatOpenAI(
            model_name="gpt-4",
            temperature=0.7,
            openai_api_key=settings.OPENAI_API_KEY,
        )

        self.embeddings = OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY)

        # Initialize conversation management
        self.conversation_history = ConversationHistory()

        # Initialize knowledge base
        self._initialize_knowledge_base()

        print("Chatbot initialization complete")

    def _initialize_knowledge_base(self):
        """Initialize and populate the knowledge base"""
        print("Building knowledge base...")
        try:
            # Prepare topics for knowledge base
            topics = [
                "Bonsai",
                "Zen philosophy",
                "Japanese gardens",
                "Meditation techniques",
                "Mindfulness practices",
                "Japanese tea ceremony",
                "Nature and harmony",
                "Buddhist teachings",
            ]

            # Fetch and process documents
            documents = self._get_wiki_data(topics)

            # Split documents into manageable chunks
            text_splitter = CharacterTextSplitter(
                chunk_size=1000, chunk_overlap=200, separator="\n"
            )
            texts = text_splitter.split_documents(documents)

            # Create vector store
            self.knowledge_base = FAISS.from_documents(
                documents=texts, embedding=self.embeddings
            )

            print(
                f"Successfully initialized knowledge base with {len(texts)} text chunks"
            )

        except Exception as e:
            print(f"Error in knowledge base initialization: {str(e)}")
            self.knowledge_base = FAISS.from_texts(
                texts=["Emergency fallback knowledge base initialized."],
                embedding=self.embeddings,
            )

    def _get_wiki_data(self, topics: List[str]) -> List[Document]:
        """Fetch Wikipedia data with error handling"""
        documents = []
        for topic in topics:
            try:
                print(f"Fetching content for: {topic}")
                content = wikipedia.summary(topic, sentences=7)
                documents.append(
                    Document(page_content=content, metadata={"source": topic})
                )
                print(f"Successfully fetched content for: {topic}")
            except Exception as e:
                print(f"Error fetching {topic}: {str(e)}")
                continue
        return documents

    def answer(self, question: str, user_name: str) -> str:
        """Generate a response to the user's question"""
        try:
            # Create the conversation chain with the knowledge base
            chain = ConversationalRetrievalChain.from_llm(
                llm=self.llm,
                retriever=self.knowledge_base.as_retriever(search_kwargs={"k": 3}),
                memory=self.conversation_history.memory,
                verbose=True,
            )

            # Generate response
            response = chain({"question": question, "chat_history": []})
            answer_text = response["answer"]

            # Update conversation history
            self.conversation_history.add_message("user", question)
            self.conversation_history.add_message("assistant", answer_text)

            return answer_text

        except Exception as e:
            print(f"Error generating response: {str(e)}")
            return f"My apologies, {user_name}. Like a disturbed pond, my thoughts are momentarily unclear. May we begin again with your question?"


# Initialize the chatbot
chatbot = ModernChatbot()
