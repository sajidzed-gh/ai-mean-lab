const createPromptList = (gitdiffExample) => {
  const prompts = {
    promptTest: [
      {
        role: 'user',
        content:
          'Summarize the following git diff in 5 bullet points, focusing on behavior changes and risks.',
      },
    ],
    promptMentor: [
      { role: 'system', content: 'You are a senior engineer mentoring a junior developer.' },
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
    promptGitHunk: [
      {
        role: 'system',
        content: `You are a Senior Software Engineer. I will provide you with code "hunks" (git diffs) from a recent push.`,
      },
      {
        role: 'user',
        content: ` Your task:
      1. Provide a high-level summary of WHAT changed and WHY (contextual logic).
      2. Identify any potential bugs, performance issues, or Angular anti-patterns.
      3. Keep the tone professional, concise, and helpful.

      CODE CHANGES:
      ${gitdiffExample}
`,
      },
    ],
  };

  return (key) => {
    if (!Object.prototype.hasOwnProperty.call(prompts, key)) {
      throw new Error(`Unknown prompt key: ${key}`);
    }
    return prompts[key];
  };
};

export default createPromptList;
