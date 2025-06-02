import dotenv from 'dotenv'
dotenv.config()
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase'
import { OpenAIEmbeddings } from '@langchain/openai'
import { createClient } from '@supabase/supabase-js'

const openAIApiKey = process.env.OPENAI_API_KEY

const embeddings = new OpenAIEmbeddings({ openAIApiKey }) // Embedding model
const sbApiKey = process.env.SUPABASE_API_KEY
const sbUrl = process.env.SUPABASE_URL_LC_CHATBOT
const client = createClient(sbUrl, sbApiKey) // Supabase client

// Set up the vector store for document retrieval
const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: 'documents',
    queryName: 'match_documents'
})

// Export retriever for use in chains
const retriever = vectorStore.asRetriever()

export { retriever }