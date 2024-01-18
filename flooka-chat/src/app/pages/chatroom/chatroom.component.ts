import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as feather from 'feather-icons';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { Message } from '../../models/Message';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { Room } from '../../models/Room';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { io } from 'socket.io-client';
@Component({
  selector: 'app-chatroom',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  templateUrl: './chatroom.component.html',
  styleUrl: './chatroom.component.scss'
})
export class ChatroomComponent implements OnInit, OnDestroy {

  destory$!: Subject<any>;

  formGroup!: FormGroup;
  messages: Message[] = [];
  sender!: User;
  receiver!: User;
  isTyping: boolean = false;
  roomId!: string;


  private socket = io('http://localhost:3000');


  @Input() text: string = "";


  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }



  ngOnInit(): void {
    feather.replace({ 'width': 20, 'height': 20 });
    this.destory$ = new Subject();
    this.initForm();
    this.activatedRoute.params.subscribe((params: any) => {
      this.roomId = params.id;
      this.joinRoom(this.roomId);
      this.loadRoom(params.id);

    });
  }



  loadRoom(roomId: string) {
    const userId = localStorage.getItem("user_id");
    this.chatService.getRoomById(roomId).subscribe({
      next: (room: Room) => {

        const memberObservables = room.members.map((member: any) =>
          this.userService.getUserById(member)
        );

        forkJoin([...memberObservables]).subscribe(
          ([...users]) => {
            users.forEach((user: User) => {
              if (user.picture == null || user.picture === "")
                user.picture = '/assets/blank-profile.webp'
              if (user._id === userId) {
                this.sender = user;
              } else {
                this.receiver = user;
              }
            });
            this.loadMessages(roomId);
          })
        
      }
    });
  }

  loadMessages(roomId: string) {
    const userId = localStorage.getItem("user_id");
    this.chatService.getMessagesByRoomId(roomId)
      .pipe(takeUntil(this.destory$))
      .subscribe({
        next: (res) => {
          this.messages = res.map((message: any) => {
            if (message.sender === userId) {
              message.sender = this.sender;
            } else {
              message.sender = this.receiver;
            }
            return message;
          });
        }
      })
  }


  isSender(id: string): boolean {
    const userId = localStorage.getItem("user_id");
    return userId === id;
  }


  scrollToBottom(): void {
    setTimeout(() => {

    }, 1);
  }


  joinRoom(roomId: string) {
    this.socket.connect();
    this.socket.emit("join_room", roomId);
    this.onGetMessage();
    this.onClientTyping();
    this.onTyping();
  }

  onTyping() {
    if (this.text.length > 0) {
      this.socket.emit('typing', true);
    } else
      this.socket.emit('typing', false);
  }

  onClientTyping() {
    this.socket.on('typing', (value: boolean) => {
      console.log(value)
      this.isTyping = value;
      if (value) this.scrollToBottom();
    })
  }

  onGetMessage() {
    this.socket.on("message", (message: Message) => {
      this.messages.push(message);
    })
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      content: [""],
    })
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
        next: (res) => {
          this.socket.emit('message', message);
          this.messages.push(message);
          this.text = "";
          this.socket.emit('typing', false)
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.destory$.next([]);
  }

}
