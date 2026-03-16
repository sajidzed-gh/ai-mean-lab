import express from 'express';
import cors from 'cors';
import { Groq } from 'groq-sdk';
import createPromptList from './promptList.js';
import 'dotenv/config';

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post('/api/summarize', async (req, res) => {
  const { diff } = req.body;
  console.log('Received diff for summarization:', diff);
  const summary = await groqFetch(diff);
  res.setHeader('Content-Type', 'text/plain');
  res.send({ summary: `summary of the --- ${summary}` });
});

async function groqFetch(paramPrompt) {
  try {
    const chatCompletion = await groq.chat.completions
      .create({
        // messages: promptList.promptGitDiff,
        messages: await getPrompt(paramPrompt),
        model: process.env.LLM_MODEL,
        temperature: 0.8,
      })
      .withResponse();
    const headers = chatCompletion.response.headers.get('x-ratelimit-remaining-tokens');
    const data = chatCompletion.data.choices[0]?.message?.content || '';
    console.log(
      'Fetching from GROQ...',
      chatCompletion,
      'dataaa:',
      data,
      'Remaining tokens:',
      headers,
    );
    //return chatCompletion.choices[0]?.message?.content || '';
    return data;
  } catch (error) {
    console.error('Error fetching from GROQ:', error);
  }
}

async function getPrompt(paramPrompt) {
  const prompt = createPromptList(paramPrompt);
  return prompt('promptGitDiff');
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
