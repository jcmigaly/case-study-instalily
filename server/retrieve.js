import 'dotenv/config'
import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from '@langchain/core/output_parsers'
import { retriever } from './utils/retriever.js'
import { combineDocuments } from './utils/combineDocuments.js'
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { ChatDeepSeek } from "@langchain/deepseek"

const openAIApiKey = process.env.OPENAI_API_KEY
const llm = new ChatOpenAI({ openAIApiKey }) // OpenAI LLM instance

const deepseekApiKey = process.env.DEEPSEEK_API_KEY
const deepseekLLM = new ChatDeepSeek({
  model: "deepseek-chat",
  temperature: 0,
  apiKey: deepseekApiKey
})

// Prompt to turn a question into a standalone question
const standaloneQuestionTemplate = `Given some conversation history (if any) and a question, convert the question to a standalone question. 
conversation history: {conv_history}
question: {question} 
standalone question:`
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate)

// Prompt for answering with context and history
const answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question about PartSelect parts based on the context provided and the conversation history. 
If the answer is not given in the context, find the answer in the conversation history if possible. 
You should only respond to requests that are relevant for parts or machines associated with dishwashers and fridges. 
If you really don't know the answer, say "I'm sorry, I don't know the answer to that." 
And direct the questioner to email CustomerService@PartSelect.com. Don't try to make up an answer. 
Always speak as if you were chatting to a friend.
context: {context}
question: {question}
conversation history: {conv_history}
answer: `
const answerPrompt = PromptTemplate.fromTemplate(answerTemplate)

// Chain to create standalone question
const standaloneQuestionChain = standaloneQuestionPrompt
    .pipe(llm)
    .pipe(new StringOutputParser())
    
// Chain to retrieve context documents
const retrieverChain = RunnableSequence.from([
    prevResult => prevResult.standalone_question,
    retriever,
    combineDocuments
])
// Chain to generate answer
const answerChain = answerPrompt
    .pipe(deepseekLLM)
    .pipe(new StringOutputParser())

// Full pipeline: standalone question -> retrieve context -> answer
const chain = RunnableSequence.from([
    {
        standalone_question: standaloneQuestionChain,
        original_input: new RunnablePassthrough()
    },
    {
        context: retrieverChain,
        question: ({ original_input }) => original_input.question,
        conv_history: ({ original_input }) => original_input.conv_history
    },
    answerChain
])

// Main exported function to get an answer
async function getAnswer(question1, context) {
    const response = await chain.invoke({ question: question1, conv_history: context });
    return response;
}

export default getAnswer;