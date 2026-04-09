import { Injectable } from '@nestjs/common';
import axios from 'axios';
import 'dotenv/config';
import createPromptList from '../../promptList.js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!!';
  }

  async gitHubApi(reqBody: any) {
    const repoName = reqBody.repository.full_name;
    const beforeCommit = reqBody.before; // The "Old" state
    const afterCommit = reqBody.after; // The "New" state

    // 1. Automatically get the Hunks from GitHub (Free API)
    const compareUrl = `https://api.github.com/repos/${repoName}/compare/${beforeCommit}...${afterCommit}`;

    const response = await axios.get(compareUrl, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_FREE_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2026-03-10',
      },
    });

    // 2. Extract patches (hunks) for each modified file
    // ignore package files & perhaps images etc
    const hunks = response.data.files
      .filter(
        (file) =>
          !file.filename.includes('package.json') &&
          !file.filename.includes('package-lock.json'),
      )
      .map((file) => ({
        filename: file.filename,
        patch: file.patch, // This is the exact code hunk!
      }));

    // 1. Format the hunks into a readable string for the AI
    const formattedDiff = hunks
      .map((h: any, index: number) => {
        return `FILE: ${h.filename}\nDIFF:\n${h.patch}`;
      })
      .join('\n\n---\n\n');

    return formattedDiff;
  }

  async GroQAPi(prompt: string): Promise<any> {
    try {
      const response = await axios.post(
        process.env.LLM_API_URL!,
        {
          model: process.env.LLM_MODEL,
          messages: await this.getPrompt(prompt, 'promptGitHunk'),
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          },
        },
      );

      const match = response.data.choices[0].message.content;
      if (match) {
        return match;
      }
      return null;
    } catch (err) {
      return `Error in Groq API, ${JSON.stringify(err)}`;
    }
  }

  async getPrompt(paramPrompt, promptKey) {
    const prompt = createPromptList(paramPrompt);
    return prompt(promptKey);
  }
}
