import { Routes } from '@angular/router';
import { Message } from './chat/message';
import { App } from './app';
import { AiGitdiffSummary } from './ai-gitdiff-summary/ai-gitdiff-summary';
import { AiGitdiffStream } from './ai-gitdiff-stream/ai-gitdiff-stream';
import { ChatWebSocket } from './chat-web-socket/chat-web-socket';

export const routes: Routes = [
  // {
  //     path: '',
  //     component: App,
  //     title: 'Home',
  // },
  {
    path: 'chat',
    component: Message,
    title: 'Chat title',
  },
  {
    path: 'ai-gitdiff-summary',
    component: AiGitdiffSummary,
    title: 'AI Git Diff Summary',
  },
  {
    path: 'ai-gitdiff-stream',
    component: AiGitdiffStream,
    title: 'AI Git Diff Stream',
  },
  {
    path: 'chat-web-socket',
    component: ChatWebSocket,
    title: 'WebSocket Chat',
  },
];
