import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import * as feather from 'feather-icons';
import { ChatService } from '../../services/chat.service';
import { Subject, takeUntil } from 'rxjs';
import { Room } from '../../models/Room';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, OnDestroy {
  destroy$!: Subject<any>;
  rooms: Room[] = [];

  ngOnInit(): void {
    feather.replace({ 'width': 20, 'height': 20 });
    this.destroy$ = new Subject();
    this.loadChatrooms();
  }

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {

  }


  loadChatrooms() {
    const userId = localStorage.getItem("user_id");
    this.chatService.getRoomsByUserId()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.rooms = res.map((room: any) => {
            room.members = room.members.filter((id: string) => id !== userId);
            this.getUserById(room.members[0]).then(user => room.members[0] = user);
            return room;
          });
        }
      })
  }

  async getUserById(userId: string): Promise<User> {
    return await new Promise((resolve, reject) => {
      this.userService.getUserById(userId).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (user: User) => {
          if (user.picture == null || user.picture === "") {
            user.picture = "/assets/blank-profile.webp";
          }
          resolve(user);
        },
        error: (err) => {
          reject(null);
        }
      })
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next([]);
  }

}
