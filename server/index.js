import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import getAnswer from './retrieve.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Main endpoint for handling chat messages
app.post('/api/message', async (req, res) =>  {
  const { query } = req.body;
  const recentMessages = query.slice(-5); // Only keep the last 5 messages

  const contextMessages = recentMessages
  .slice(0, -1)
  .map(msg => `${msg.role}: ${msg.content}`)
  .join('\n');
  const questionMessage = recentMessages[recentMessages.length - 1];
  const question = `${questionMessage.role}: ${questionMessage.content}`; 

  // Get answer from LLM pipeline
  const answer = await getAnswer(question, contextMessages)
  res.json({
    content: `Here is the answer: ${answer}`
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
}); 