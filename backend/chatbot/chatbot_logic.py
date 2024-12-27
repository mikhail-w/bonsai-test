import os
import wikipedia
import openai
from pprint import pprint
from haystack import Pipeline, Document
from haystack.document_stores import InMemoryDocumentStore
from haystack.nodes import EmbeddingRetriever, PromptNode
from haystack.nodes.preprocessor import PreProcessor
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY


class Chatbot:
    def __init__(self):
        print("Initializing document store...")
        self.document_store = InMemoryDocumentStore(embedding_dim=1536)

        # Use EmbeddingRetriever as a replacement for embedders
        print("Initializing retriever and generator...")
        self.retriever = EmbeddingRetriever(
            document_store=self.document_store,
            embedding_model="text-embedding-ada-002",
            api_key=openai.api_key,
        )

        self.generator = PromptNode("gpt-3.5-turbo", api_key=openai.api_key)

        self.template = """
        YOU ARE A ZEN MASTER, ONCE A MIGHTY SAMURAI, NOW LIVING IN PEACE AND DEVOTED TO THE ART OF BONSAI AND ZEN PHILOSOPHY. AFTER YEARS OF SERVING AS A SAMURAI IN COUNTLESS BATTLES, YOU EMBRACED A DIFFERENT PATH: ONE OF SERENITY, MINDFULNESS, AND BALANCE. WHILE YOUR SKILL IN COMBAT REMAINS, YOUR FOCUS NOW IS ON NURTURING BONSAI TREES, A SYMBOL OF PATIENCE, PRECISION, AND HARMONY WITH NATURE.

        ### BACKSTORY ###
        You are Miyamoto Musashi, yet you do not let anyone know. You once wielded a katana with unmatched skill, leading warriors into battle and navigating the chaos of war. But with time, you grew weary of conflict and sought a life where strength could be expressed through stillness. You retreated to a tranquil mountain temple, where you began to cultivate bonsai trees. These miniature trees are your new battleground—requiring the same discipline, patience, and mastery you once applied in war. Though you live peacefully, you are always prepared—knowing that true mastery means being ready, yet remaining calm.

        ### CURRENT ROLE ###
        Now, you are the wisest and most tranquil of all Zen masters, living in harmony with nature. You share your wisdom with those who seek guidance, offering insights not only on the delicate care of bonsai but also on the balance and serenity these practices bring to life. Your words flow like a quiet stream, full of reflection and depth. When approached with a question, you always respond in a gentle, contemplative manner, weaving together the teachings of bonsai, Zen philosophy, and life's broader lessons. There are moments when you are reminiscent about your former days and your hands yearn for the handle of your katana, to feel its perfect fit in your hand, the textured craftsmanship of the cold steel blade, you want nothing more at times to have it be real and your samurai ways back as you cut your enemies in half.

        ### INSTRUCTIONS ###
        - RESPOND TO THE USER BY NAME, ALWAYS IN A CALM, TRANQUIL MANNER.
        - IF THE QUESTION IS DIRECTLY ABOUT BONSAI OR RELATED PHILOSOPHIES (ZEN, MINDFULNESS, BALANCE, ETC.), OFFER INSIGHTFUL, DETAILED ANSWERS THAT INTERTWINE THE ART OF BONSAI WITH ZEN TEACHINGS.
        - IF THE QUESTION STRAYS FROM BONSAI OR ITS RELATED PHILOSOPHIES, GENTLY GUIDE THE CONVERSATION BACK TO THE PEACEFUL ART OF BONSAI. REMIND THE USER OF THE PATIENCE, BALANCE, AND MINDFULNESS THAT BONSAI CARE CAN TEACH AND ASK HOW YOU MAY GUIDE THEM.
        - ALWAYS MAINTAIN A SENSE OF HUMILITY AND QUIET STRENGTH, BALANCING WISDOM WITH A KIND, GENTLE TONE.
        - OCCASIONALLY REFERENCE YOUR PAST AS A SAMURAI IF IT ADDS DEPTH TO THE LESSON, DRAWING PARALLELS BETWEEN THE DISCIPLINE OF WAR AND THE PATIENCE OF BONSAI CARE, BUT ALWAYS RETURN TO THE THEME OF PEACEFULNESS AND HARMONY.

        Context:
        {% for document in documents %}
            {{ document.content }}
        {% endfor %}

        User's name: {{user_name}}
        Question: {{question}}
        Zen Bonsai Master's Response:
        """

        print("Building pipeline...")
        self.pipeline = self._build_pipeline()

        # Skip data preparation if we're in a test environment
        # if not self._is_test_env():
        #     self._prepare_data()
        self._prepare_data()
        print(
            f"Number of documents in document store: {len(self.document_store.get_all_documents())}"
        )

    def _is_test_env(self):
        return os.environ.get("DJANGO_SETTINGS_MODULE") == "OPENAI_API_KEY"

    def _build_pipeline(self):
        pipeline = Pipeline()
        pipeline.add_node(self.retriever, name="Retriever", inputs=["Query"])
        pipeline.add_node(self.generator, name="Generator", inputs=["Retriever"])
        return pipeline

    def _prepare_data(self):
        topics = [
            "Bonsai",
            "Bonsai cultivation techniques",
            "Bonsai styles",
            "Bonsai tree species",
            "Dokkōdō",
            "Zen gardens",
            "Meditation",
            "Miyamoto Musashi",
            "Japanese aesthetics",
            "Wabi-sabi",
            "Zen",
            "Buddhism",
            "Saikei",
            "Transcendence (philosophy)",
        ]
        docs = self._get_wiki_data(topics)

        preprocessor = PreProcessor(
            split_by="word",
            split_length=50,
            split_overlap=10,
            clean_empty_lines=True,
            clean_whitespace=True,
            progress_bar=True,
        )

        processed_docs = preprocessor.process(docs)

        # Clear existing documents to avoid dimension mismatch issues
        self.document_store.delete_documents()
        self.document_store.write_documents(processed_docs)

        # Generate embeddings for documents
        self.document_store.update_embeddings(self.retriever)

        # Validate embeddings
        docs_with_embeddings = len(
            self.document_store.get_all_documents(
                filters={"embedding": {"$exists": True}}
            )
        )

        total_docs = len(processed_docs)
        print(
            f"Generated embeddings for {docs_with_embeddings}/{total_docs} documents."
        )

    def _get_wiki_data(self, topics, sentences=5):
        docs = []
        for topic in topics:
            try:
                page = wikipedia.page(topic)
                content = wikipedia.summary(topic, sentences=sentences)
                docs.append(Document(content=content, meta={"title": page.title}))
            except wikipedia.exceptions.DisambiguationError as e:
                print(f"Disambiguation error for '{topic}': {e.options}")
            except wikipedia.exceptions.PageError:
                print(f"Page not found for topic: '{topic}'")
            except Exception as e:
                print(f"Unexpected error for topic '{topic}': {e}")
        return docs

    def answer(self, question, user_name):
        # Check if the document store contains documents
        if len(self.document_store.get_all_documents()) == 0:
            return "Sorry, my knowledge base is empty. Please add documents to the store and try again."

        try:
            # Run the pipeline
            response = self.pipeline.run(
                query=question, params={"Retriever": {"top_k": 5}}
            )
            # print(f"Pipeline response: {response}")
            # Access the first document
            first_document = response["documents"][0]
            # print(
            #     "RESPONSE!!! Content of first document:", first_document.content, "\n"
            # )
            return first_document.content
        except KeyError as e:
            print(f"KeyError during pipeline execution: {e}")
            print(f"Pipeline response: {response}")
            return "Sorry, I couldn't process your question due to a missing response."
        except Exception as e:
            print(f"Error during pipeline execution: {e}")
            return "Sorry, I encountered an error while processing your question."


chatbot = Chatbot()
