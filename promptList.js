const gitdiffExample = `diff --git a/server.js b/server.js
index 6d757c1..7891dab 100644
--- a/server.js
+++ b/server.js
@@ -1,15 +1,40 @@
 import express from 'express';
-import fetch from 'node-fetch';
+import { Groq } from 'groq-sdk';
+import promptList from './promptList.js';

 const app = express();
 app.use(express.json());

+const groq = new Groq({
+  apiKey: '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',
+});
+
 app.post('/api/summarize', async (req, res) => {
   const { diff } = req.body;


+  const summary = await groqFetch();
+  res.setHeader('Content-Type', 'text/plain');
+  res.send({ summary: 'summary of the --- {summary}' });
 });

+async function groqFetch() {
+  try {
+    const chatCompletion = await groq.chat.completions.create({
+      messages: promptList.promptGitDiff,
+      model: 'llama-3.1-8b-instant',
+      temperature: 0.8,
+    });
+    console.log(
+      'Fetching from GROQ...',
+      chatCompletion,
+      chatCompletion.choices[0]?.message?.content || '',
+    );
+    return chatCompletion.choices[0]?.message?.content || '';
+  } catch (error) {
+    console.error('Error fetching from GROQ:', error);
+  }
+}
+
 app.listen(3000, () => {
   console.log('Server is running on port 3000');
 });`;

const promptList = {
  promptTest: [
    {
      role: 'user',
      content:
        'Summarize the following git diff in 5 bullet points, focusing on behavior changes and risks.',
    },
  ],
  promptMentor: [
    { role: 'system', content: 'You are an senior engineer mentoring a junior developer.' },
    { role: 'user', content: 'give short description of Linked List.' },
  ],
  promptGitDiff: [
    { role: 'system', content: 'You are a senior engineer reviewing a pull request.' },
    {
      role: 'user',
      content: `Summarize the following git diff in 5 bullet points.
        Focus on:
        - functional changes
        - risk areas
        - files touched

        DIFF: ${gitdiffExample}
        `,
    },
  ],
};

export default promptList;
