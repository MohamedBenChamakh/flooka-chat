import { Component, OnInit } from '@angular/core';
import { Room } from '../../models/Room';
import { User } from '../../models/User';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { RefresherEventDetail } from '@ionic/angular';
import { IonRefresherCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-chatrooms',
  templateUrl: './chatrooms.page.html',
  styleUrls: ['./chatrooms.page.scss'],
})
export class ChatroomsPage implements OnInit {


  rooms: Room[] = [];

  constructor(private chatService: ChatService, private userService: UserService) { }

  ngOnInit() {
    this.getRoomsById();
  }

  getRoomsById($event?: any) {
    const userId = localStorage.getItem("user_id")
    this.chatService.getRoomsByUserId().subscribe({
      next: (result) => {
        result = result.map((room: any) => ({ ...room, members: room.members.filter((id: string) => id != userId) }));
        this.rooms = result.map((room: any) => {
          this.userService.getUserById(room.members[0]).subscribe({
            next: (user: User) => {
              if (user.picture == null || user.picture === "")
                user.picture = '/assets/blank-profile.webp';
              room.members[0] = user
            },
          })
          return room;
        });
        if ($event) $event.target.complete();
      },
      error: (error) => console.log(error)
    })
  }

  handleRefresh($event: IonRefresherCustomEvent<RefresherEventDetail>) {
    this.getRoomsById($event);

  }
}
