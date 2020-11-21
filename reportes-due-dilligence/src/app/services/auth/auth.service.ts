import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from  "@angular/fire/auth";
import { DataStorageService } from "../dataStore/data-store.service";
import { Usuario } from "../../models/modelos";
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;
  isLoged: boolean;
  usuario: Usuario;

  constructor(
    private dataStorage: DataStorageService, 
    private location: Location,
    private useService: UsuarioService,
    private afs: AngularFirestore,   // Inject Firestore service
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router,
  ) {
    this.afAuth.authState.subscribe( authState => {
      this.authState = authState;
    });
   }

  get isAuthenticated(): boolean {
    return this.authState !== null;
}

  isLogged() {
    let user = this.afAuth.user;
    return user? true: false;
    
  }
  async getUser() {
    this.usuario = await this.useService.getusuarioByEmail(this.authState.email)[0];
  }

  usuarioStorage() {
    let user =this.afAuth.user;
    return user? true: false;
    
  }

   // Sign in with email/password
   SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.isLoged = true;
        let res;
        this.useService.getusuarioByEmail(email).subscribe(
          res=> {
            this.usuario = res[0];
            this.dataStorage.setObjectValue('due-dilligence-user', this.usuario);
            this.router.navigate(["home"]);
          }
        );
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        let usuario: Usuario;
        usuario = {
          id: "0",
          email: email,
          admin: false
        }
        this.useService.saveusuario(usuario);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
}
