import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public formGroup!: FormGroup;
  
  constructor( 
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      phone: ["", Validators.required],
      age: ["", Validators.required],
      country: ["", Validators.required],
      gender: ["", Validators.required],
      password: ["", Validators.required],
      createdAt: new Date(),
    });
  }

  onSubmit() {
    const formValue = this.formGroup.value;
    this.authService.signup(formValue).subscribe(
      (response) => {
        this.router.navigateByUrl('/auth');
      }
    )
  }


}
