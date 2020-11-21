import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataStorageService } from "../dataStore/data-store.service";
import { Usuario } from "../../models/modelos";
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private dataStorage: DataStorageService, 
    private angularFirestore: AngularFirestore,  
    private location: Location,
    private router: Router,
  ) { }

  getusuarios(): Observable<Usuario[]> {
    return this.angularFirestore.collection<Usuario>('usuario').valueChanges();
  }

  getusuarioById(id: string): Observable<Usuario[]> {
    return this.angularFirestore.collection<Usuario>('usuario', ref => ref.where('id', '==', id)).valueChanges();
  }

  getusuarioByEmail(email: string): Observable<Usuario[]> {
    return this.angularFirestore.collection<Usuario>('usuario', ref => ref.where('email', '==', email)).valueChanges();
  }

  deleteusuarios(id: string) {
    //this.blockUI.start("Guardando cambios");
    this.angularFirestore.collection<Usuario>('usuario').doc(id).delete().then(()=>{
      //this.alertas.successInfoAlert("Eliminado correctamente");
      //this.blockUI.stop();
    }).catch(()=>{
      //this.blockUI.stop();
      //this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo eliminar el registro");
    });
  }

  saveusuario(usuario: Usuario) {
    if (usuario.id !== "0") {
    //this.blockUI.start("Guardando cambios");

      this.angularFirestore.collection<Usuario>('usuario').doc(usuario.id).update(usuario).then(()=>{
      //this.blockUI.stop();

        //this.alertas.successInfoAlert("Actualización exitosa");
        //this.location.back();
        this.router.navigate(["log-in"]);
      }).catch(()=>{
      //this.blockUI.stop();

        //this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
        this.location.back();
      });
     
    } else {
      usuario.id = this.angularFirestore.createId();
    //this.blockUI.start("Guardando cambios");

      this.angularFirestore.collection<Usuario>('usuario').doc(usuario.id).set(usuario).then(()=>{
      //this.blockUI.stop();

        //this.alertas.successInfoAlert("Inserción exitosa");
        this.location.back();
      }).catch((err)=>{
      //this.blockUI.stop();

        //this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo guardar el nuevo registro");
        this.location.back();
      });
    }
  }

  saveusuarioRol(usuario: Usuario) {
    if (usuario.id !== "0") {
    //this.blockUI.start("Guardando cambios");

      this.angularFirestore.collection<Usuario>('usuario').doc(usuario.id).update(usuario).then(()=>{
      //this.blockUI.stop();

        //this.alertas.successInfoAlert("Actualización exitosa");
      }).catch(()=>{
      //this.blockUI.stop();

        //this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
        this.location.back();
      });
     
    } else {
      usuario.id = this.angularFirestore.createId();
    //this.blockUI.start("Guardando cambios");

      this.angularFirestore.collection<Usuario>('usuario').doc(usuario.id).set(usuario).then(()=>{
      //this.blockUI.stop();

        //this.alertas.successInfoAlert("Inserción exitosa");
        this.location.back();
      }).catch((err)=>{
      //this.blockUI.stop();

        //this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo guardar el nuevo registro");
      });
    }
  }

}
