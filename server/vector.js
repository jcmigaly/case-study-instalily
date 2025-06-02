import 'dotenv/config'
import { readFile } from 'fs/promises'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { createClient } from '@supabase/supabase-js'
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase"
import { OpenAIEmbeddings } from '@langchain/openai'

try {
    // Read the info.txt file containing the data
    const text = await readFile('./info.txt', 'utf-8')

    // Split the text into chunks for embedding
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
        separators: ['\n\n', '\n', ' ', ''] // default setting
    })

    const output = await splitter.createDocuments([text])

    // Set up Supabase and OpenAI API keys
    const sbApiKey = process.env.SUPABASE_API_KEY
    const sbUrl = process.env.SUPABASE_URL_LC_CHATBOT
    const openAIApiKey = process.env.OPENAI_API_KEY

    // Create Supabase client
    const client = createClient(sbUrl, sbApiKey)

    // Store the document embeddings in Supabase
    await SupabaseVectorStore.fromDocuments(
        output,
        new OpenAIEmbeddings({ openAIApiKey }),
        {
            client,
            tableName: 'documents',
        }
    )

} catch (err) {
    console.error(err)
}
