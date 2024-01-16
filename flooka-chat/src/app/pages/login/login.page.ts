import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formGroup!: FormGroup;
  public btnLoader = false;
  public message = "";

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    this.btnLoader = true;
    const formValue = this.formGroup.value;
    this.authService.login(formValue).subscribe({
      next: (response) => {
        this.btnLoader = false;
        this.router.navigateByUrl("/main/chatrooms");
      }, 
      error: (response) => {
        this.btnLoader = false;
        this.message = response.error.message;
      }
    });
  }

}
