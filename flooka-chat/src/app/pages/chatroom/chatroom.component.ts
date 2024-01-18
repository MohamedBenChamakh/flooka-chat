import { Component, OnDestroy, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
import { Subject, takeUntil } from 'rxjs';
import { Message } from '../../models/Message';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss'
})
export class ChatroomComponent implements OnInit, OnDestroy {
  destory$!: Subject<any>;
  messages: Message[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
  ) { }



  ngOnInit(): void {
    feather.replace({ 'width': 20, 'height': 20 });
    this.destory$= new Subject();
    this.activatedRoute.params.subscribe((params: any) => this.loadMessages(params.id));
  }

  loadMessages(roomId: string) {
    this.chatService.getMessagesByRoomId(roomId)
      .pipe(takeUntil(this.destory$))
      .subscribe({
        next: (res) => {
          this.messages = res;
        }
      })
  }


  ngOnDestroy(): void {
    this.destory$.next([]);
  }

}
