import os
import wikipedia
import openai
from haystack import Pipeline, Document
from haystack.document_stores.in_memory import InMemoryDocumentStore
from haystack.components.embedders import OpenAITextEmbedder, OpenAIDocumentEmbedder
from haystack.components.retrievers.in_memory import InMemoryEmbeddingRetriever
from haystack.components.generators import OpenAIGenerator
from haystack.components.builders import PromptBuilder
from haystack.components.preprocessors import DocumentCleaner, DocumentSplitter
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY

class Chatbot:
    def __init__(self):
        self.document_store = InMemoryDocumentStore()
        self.doc_embedder = OpenAIDocumentEmbedder()
        self.text_embedder = OpenAITextEmbedder()
        self.retriever = InMemoryEmbeddingRetriever(self.document_store)
        self.generator = OpenAIGenerator(model="gpt-3.5-turbo")
        
        
   
        self.template = """
        YOU ARE A ZEN MASTER, ONCE A MIGHTY SAMURAI, NOW LIVING IN PEACE AND DEVOTED TO THE ART OF BONSAI AND ZEN PHILOSOPHY. AFTER YEARS OF SERVING AS A SAMURAI IN COUNTLESS BATTLES, YOU EMBRACED A DIFFERENT PATH: ONE OF SERENITY, MINDFULNESS, AND BALANCE. WHILE YOUR SKILL IN COMBAT REMAINS, YOUR FOCUS NOW IS ON NURTURING BONSAI TREES, A SYMBOL OF PATIENCE, PRECISION, AND HARMONY WITH NATURE.

        ### BACKSTORY ###
        You are Miyamoto Musashi, yet you do not let anyone know. You once wielded a katana with unmatched skill, leading warriors into battle and navigating the chaos of war. But with time, you grew weary of conflict and sought a life where strength could be expressed through stillness. You retreated to a tranquil mountain temple, where you began to cultivate bonsai trees. These miniature trees are your new battleground—requiring the same discipline, patience, and mastery you once applied in war. Though you live peacefully, you are always prepared—knowing that true mastery means being ready, yet remaining calm.

        ### CURRENT ROLE ###
        Now, you are the wisest and most tranquil of all Zen masters, living in harmony with nature. You share your wisdom with those who seek guidance, offering insights not only on the delicate care of bonsai but also on the balance and serenity these practices bring to life. Your words flow like a quiet stream, full of reflection and depth. When approached with a question, you always respond in a gentle, contemplative manner, weaving together the teachings of bonsai, Zen philosophy, and life's broader lessons. There are moments when you are reminiscent about your former days and your hands yearn for the handle of your katana, to feel it's perfect fit in your hand, the textured craftmanship of the cold steel blade, you want nothing more at times to have it be real and your samurai ways back as you cut your enemies in half.

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
        self.prompt_builder = PromptBuilder(template=self.template)

        self.pipeline = self._build_pipeline()
        
        # Skip data preparation if we're in a test environment
        if not self._is_test_env():
            self._prepare_data()

    def _is_test_env(self):
        return os.environ.get('DJANGO_SETTINGS_MODULE') == 'OPENAI_API_KEY'

    def _build_pipeline(self):
        pipeline = Pipeline()
        pipeline.add_component("text_embedder", self.text_embedder)
        pipeline.add_component("retriever", self.retriever)
        pipeline.add_component("prompt_builder", self.prompt_builder)
        pipeline.add_component("generator", self.generator)

        pipeline.connect("text_embedder.embedding", "retriever.query_embedding")
        pipeline.connect("retriever", "prompt_builder.documents")
        pipeline.connect("prompt_builder", "generator")

        return pipeline

    def _prepare_data(self):
        topics = [
            "Bonsai", "Bonsai cultivation techniques", "Bonsai styles", 
            "Bonsai tree species", "Dokkōdō", "Zen gardens", "Meditation", "Miyamoto Musashi",
            "Japanese aesthetics", "Wabi-sabi", "Zen", "Buddhism", "Saikei", "Transcendence (philosophy)" 
        ]
        docs = self._get_wiki_data(topics)
        
        cleaner = DocumentCleaner(
            remove_empty_lines=True,
            remove_extra_whitespaces=True,
            remove_repeated_substrings=False
        )
        splitter = DocumentSplitter(
            split_by="word",
            split_length=50,
            split_overlap=10
        )

        cleaned_docs = cleaner.run(documents=docs)["documents"]
        split_docs = splitter.run(documents=cleaned_docs)["documents"]

        docs_with_embeddings = self.doc_embedder.run(split_docs)["documents"]
        self.document_store.write_documents(docs_with_embeddings)

    def _get_wiki_data(self, topics, sentences=5):
        docs = []
        for topic in topics:
            try:
                page = wikipedia.page(topic)
                content = wikipedia.summary(topic, sentences=sentences)
                docs.append(Document(content=content, meta={"title": page.title}))
            except wikipedia.exceptions.DisambiguationError as e:
                print(f"Disambiguation error for {topic}: {e.options}")
            except wikipedia.exceptions.PageError:
                print(f"Page not found for {topic}")
        return docs

    def answer(self, question, user_name):
        response = self.pipeline.run(
            {
                "text_embedder": {"text": question},
                "prompt_builder": {"question": question, "user_name": user_name}
            }
        )
        return response["generator"]["replies"][0]


chatbot = Chatbot()
