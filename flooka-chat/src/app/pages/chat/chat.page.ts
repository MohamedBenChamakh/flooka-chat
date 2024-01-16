import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Message } from '../../models/Message';
import { Room } from '../../models/Room';
import { User } from '../../models/User';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { forkJoin } from 'rxjs';
import { ChatroomsPage } from '../chatrooms/chatrooms.page';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, AfterViewInit {
  private activatedRoute = inject(ActivatedRoute);
  @Input() text: string = "";
  isTyping: boolean = false;
  messages: Message[] = [];
  roomId!: string;
  receiver!: User;
  sender!: User;
  @ViewChild('content', { static: true }) content!: IonContent;


  constructor(private socket: Socket, private chatService: ChatService, private userService: UserService) {


  }
  ngAfterViewInit(): void {

  }

  ngOnInit() {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      this.roomId = this.activatedRoute.snapshot.paramMap.get('id') as string;
      this.socket.connect();
      this.socket.emit("join_room", this.roomId)
      this.socket.on('message', (message: Message) => {
        this.messages.push(message);
      })
      this.socket.on('typing', (value: boolean) => {
        this.isTyping = value;
        if (value) this.scrollToBottom();
      })
      this.chatService.getRoomById(this.roomId).subscribe({
        next: (room: Room) => {
          const memberObservables = room.members.map((member: any) =>
            this.userService.getUserById(member)
          );

          forkJoin(memberObservables).subscribe({
            next: (users: User[]) => {
              users.forEach((user: User) => {
                if (user.picture == null || user.picture === "")
                  user.picture = '/assets/blank-profile.webp'
                if (user._id === userId) {
                  this.sender = user;
                } else {
                  this.receiver = user;
                }
              });
              this.chatService.getMessagesByRoomId(this.roomId).subscribe(
                {
                  next: (messages: any) => {
                    this.messages = messages.map((message: any) => {
                      if (message.sender === userId) {
                        message.sender = this.sender;
                      } else {
                        message.sender = this.receiver;
                      }
                      return message;
                    });


                  },
                  complete: () => this.scrollToBottom()
                }
              )

            },
          });
        }
      });
    }
  }

  scrollToBottom(): void {
    console.log("scrollToBottom")
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1);
  }


  write() {
    if (this.text.length > 0) {
      this.socket.emit('typing', true);
    } else
      this.socket.emit('typing', false);

  }

  onSubmit() {
    const userId = localStorage.getItem("user_id");
    if (this.text && userId) {

      let message = {
        createdAt: new Date(),
        content: this.text,
        roomId: this.roomId,
        sender: this.sender,
      };
      this.chatService.sendMessage(message).subscribe({
        next: (result) => {
          this.socket.emit('message', message);
          this.messages.push(message);
          this.text = "";
        }
      })

      this.socket.emit('typing', false)
    }
  }

}
