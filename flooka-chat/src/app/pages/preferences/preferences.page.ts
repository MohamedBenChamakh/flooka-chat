import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private chatService: ChatService,
    private router: Router,
    private toastController: ToastController,
    private location: Location
   ) { }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.formGroup = this.formBuilder.group({
      age: ["", Validators.required],
      gender: ["Men", Validators.required],
      country: ["", Validators.required],
    });
  }
  onSubmit() {
    const formValue = this.formGroup.value;
    this.chatService.createRoom(formValue).subscribe({
      next: async (result) => {
        const toast = this.toastController.create({
          message: 'Room created succesfully',
          duration: 1500,
          position: 'bottom',
        });
        (await toast).present();
        this.router.navigateByUrl(`/menu/chatrooms/${result._id}`);
      },
      error: async (err) => {
        const toast = this.toastController.create({
          message: 'Error, room could not be created, please try again!',
          duration: 1500,
          position: 'bottom',
        });
        (await toast).present();
      },
   
    })
  }
}
