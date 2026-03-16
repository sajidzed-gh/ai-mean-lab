import express from 'express';
import { Groq } from 'groq-sdk';
import promptList from './promptList.js';
import 'dotenv/config';

const app = express();
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post('/api/summarize', async (req, res) => {
  const { diff } = req.body;

  const summary = await groqFetch();
  res.setHeader('Content-Type', 'text/plain');
  res.send({ summary: `summary of the --- ${summary}` });
});

async function groqFetch() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: promptList.promptGitDiff,
      model: process.env.LLM_MODEL,
      temperature: 0.8,
    });
    console.log(
      'Fetching from GROQ...',
      chatCompletion,
      chatCompletion.choices[0]?.message?.content || '',
    );
    return chatCompletion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error fetching from GROQ:', error);
  }
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
