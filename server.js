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

app.get('/api/numbers-stream', async (req, res) => {
  const start = parseInt(req.query.current) || 1;
  const limit = parseInt(req.query.limit) || 100;

  const numbers = [];
  // Ensure we don't go past 1000
  const end = Math.min(start + limit - 1, 1000);

  for (let i = start; i <= end; i++) {
    numbers.push(i);
  }
  // Simulate a delay for streaming effect
  setTimeout(() => res.json({ data: numbers, nextStart: end + 1 }), 700);
});

app.get('/api/summarize-stream', async (req, res) => {
  const diff = req.query.diff || '';
  console.log('Received diff for streaming summarization:', diff);
  // set heaers for Server Side Events (SSE)
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = await groq.chat.completions.create({
      messages: await getPrompt(diff),
      model: process.env.LLM_MODEL,
      temperature: 0.8,
      stream: true,
    });
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ text: content })}\n\n`);
      }
    }
    res.end();
  } catch (error) {
    res.status(500).write(`data: ${JSON.stringify({ error: 'Stream Failed' })}\n\n`); // Send error message as SSE
    res.end();
  }
});

/**helpers below */

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
