import { Routes } from '@angular/router';
import { Message } from './chat/message';
import { App } from './app';

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
];
