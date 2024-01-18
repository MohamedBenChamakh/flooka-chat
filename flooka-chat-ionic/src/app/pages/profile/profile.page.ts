import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user!: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getPersonalInfo().subscribe({
      next: (result) => {
        if (result.picture == null || result.picture === "")
          result.picture = '/assets/blank-profile.webp'
        this.user = result
      }
    })
  }

}
