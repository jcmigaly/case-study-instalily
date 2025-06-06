# RAG Chatbot with LangChain.js + Supabase

This is a retrieval-augmented generation (RAG) chatbot built using **LangChain.js**, **OpenAI embeddings**, and **Supabase** as a vector store. The chatbot answers user questions based on custom, domain-specific data, making it ideal for tailored knowledge applications.

---

## Features

* **Custom Knowledge Base**: Parses and indexes text data to enable intelligent, context-aware Q\&A.
* **LangChain Expression Language**: Streamlines the logic of AI pipelines using a composable and declarative approach.
* **Vector Search**: Converts text into embeddings and stores them in Supabase for fast semantic search.
* **Contextual Retrieval**: Dynamically fetches the most relevant text chunks to answer user queries accurately.
* **Interactive Chat Interface**: Simple frontend to test and interact with the retrieval system.

---

## What I Built

* Designed a full-stack pipeline that:

  * Chunks raw text,
  * Embeds it with OpenAI,
  * Stores and retrieves vectors via Supabase.
* Implemented a retrieval chain to enable real-time, data-specific responses from the chatbot.
* Uses up to the last 5 messages as additional context to provide coherent and context-aware replies.
* Scraped web pages to power the system and validate generalizability.
* Built the UI and backend logic to support seamless integration between user input and AI-generated answers.

---

## Potential Improvements

* Add file upload for live ingestion of user documents.
* Improve conversational memory and history tracking.
* Support multi-source and multi-user knowledge bases.

---

## 🧑‍💻 Author

Developed by JonCarlo Migaly — showcasing applied experience in full-stack AI development, vector search, and real-world chatbot deployment.

