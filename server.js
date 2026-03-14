import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

app.post('/api/summarize', async (req, res) => {
  const { diff } = req.body;

  res.send({ summary: `Summary of the diff: ${diff.substring(0, 10)}...` });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
