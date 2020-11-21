import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../../services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) { }

  initForm() {
    this.formLogin = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  get emailFormControl() {
    return this.formLogin.controls["email"];
  }

  get passwordFormControl() {
    return this.formLogin.controls["password"];
  }

  doSingIn() {
    this.auth.SignIn(
      this.emailFormControl.value,
      this.passwordFormControl.value
      );
  }

  ngOnInit(): void {
    this.initForm();
  }

  getFormControl(tipe:string) {
    return this.formLogin.controls[tipe];
  }

}
