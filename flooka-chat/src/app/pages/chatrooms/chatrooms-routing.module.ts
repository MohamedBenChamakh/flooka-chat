import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatroomsPage } from './chatrooms.page';

const routes: Routes = [
  {
    path: '',
    component: ChatroomsPage
  },
   {
    path: ':id',
    loadChildren: () => import('../chat/chat.module').then(m => m.ChatPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatroomsPageRoutingModule { }
