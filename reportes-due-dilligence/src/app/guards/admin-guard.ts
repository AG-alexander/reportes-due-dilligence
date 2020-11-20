import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Usuario } from '../models/modelos';
import { AuthService, DataStorageService, UsuarioService } from "../services/services";
import { Location } from '@angular/common';
import { CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(
        private afAuth: AngularFireAuth, 
        private router: Router, 
        private authService:AuthService,
        private dataStorage: DataStorageService,
        private usuarioService: UsuarioService
        ) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
          let usuario = this.dataStorage.getObjectValue('due-dilligence-user') as Usuario;
        if (usuario) {
            return usuario.admin;
            //return true;
        } else {
            this.router.navigate(["sing-in"]);
            return false;
        }
        
     }
  }