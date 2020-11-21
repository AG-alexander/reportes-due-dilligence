import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService, AuthService } from '../../services/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private usuService: UsuarioService
  ) { }

  initForm() {
    this.formRegister = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  get emailFormControl() {
    return this.formRegister.controls["email"];
  }

  get passwordFormControl() {
    return this.formRegister.controls["password"];
  }

  doSingUp() {
    this.auth.SignUp(
      this.emailFormControl.value,
      this.passwordFormControl.value
      ).then((res)=>{
        
        }).catch((err)=>{
        
        });
  }

  ngOnInit(): void {
    this.initForm();
  }

  getFormControl(tipe:string) {
    return this.formRegister.controls[tipe];
  }

}
