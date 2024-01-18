import { Component, OnDestroy, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { Message } from '../../models/Message';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { Room } from '../../models/Room';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';

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
  sender!: User;
  receiver!: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService
  ) { }



  ngOnInit(): void {
    feather.replace({ 'width': 20, 'height': 20 });
    this.destory$ = new Subject();
    this.activatedRoute.params.subscribe((params: any) => {
      this.loadRoom(params.id);
      this.loadMessages(params.id)
    });
  }

  loadRoom(roomId: string) {
    const userId = localStorage.getItem("user_id");
    this.chatService.getRoomById(roomId).subscribe({
      next: (room: Room) => {
        const memberObservables = room.members.map((member: any) =>
          this.userService.getUserById(member)
        );

        forkJoin([memberObservables]).subscribe(
          ([users]) => {
            users.forEach((user: User) => {
              if (user.picture == null || user.picture === "")
                user.picture = '/assets/blank-profile.webp'
              if (user._id === userId) {
                this.sender = user;
              } else {
                this.receiver = user;
              }
            });

          })
      }
    });
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


  isSender(id: string) {
    const userId = localStorage.getItem("user_id");
    return userId === id;
  }

  ngOnDestroy(): void {
    this.destory$.next([]);
  }

}
