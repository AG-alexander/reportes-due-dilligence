import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Usuario } from '../models/modelos';
import { AuthService, DataStorageService } from "../services/services";
import { Location } from '@angular/common';
import { CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NormalGuard implements CanActivate {
    constructor(
        private afAuth: AngularFireAuth, 
        private router: Router, 
        private authService:AuthService,
        private dataStorage: DataStorageService
        ) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated || this.authService.isLoged || this.dataStorage.getObjectValue('due-dilligence-user')) {
            return true;
        }
        this.router.navigate(["sing-in"]);
        return false;
     }
  }