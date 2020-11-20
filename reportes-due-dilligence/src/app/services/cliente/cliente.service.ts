import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataStorageService } from "../dataStore/data-store.service";
import { Cliente } from "../../models/modelos";
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private dataStorage: DataStorageService, 
    private angularFirestore: AngularFirestore,  
    private location: Location
  ) { }
  
  getClientes(): Observable<Cliente[]> {
    return this.angularFirestore.collection<Cliente>('cliente').valueChanges();
  }

  getClienteById(id: string): Observable<Cliente[]> {
    return this.angularFirestore.collection<Cliente>('cliente', ref => ref.where('id', '==', id)).valueChanges();
  }

  getClienteByIdentification(identificacion: string): Observable<Cliente[]> {
    return this.angularFirestore.collection<Cliente>('cliente', ref => ref.where('identificacion', '==', identificacion)).valueChanges();
  }

  deleteClientes(id: string) {
    //this.blockUI.start("Guardando cambios");
    this.angularFirestore.collection<Cliente>('cliente').doc(id).delete().then(()=>{
      //this.alertas.successInfoAlert("Eliminado correctamente");
      //this.blockUI.stop();
    }).catch(()=>{
      //this.blockUI.stop();
      //this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo eliminar el registro");
    });
  }

  saveCliente(cliente: Cliente) {
    if (cliente.id !== "0") {
    //this.blockUI.start("Guardando cambios");

      this.angularFirestore.collection<Cliente>('cliente').doc(cliente.id).update(cliente).then(()=>{
      //this.blockUI.stop();

        //this.alertas.successInfoAlert("Actualización exitosa");
        this.location.back();
      }).catch(()=>{
      //this.blockUI.stop();

        //this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
        this.location.back();
      });
     
    } else {
      cliente.id = this.angularFirestore.createId();
    //this.blockUI.start("Guardando cambios");

      this.angularFirestore.collection<Cliente>('cliente').doc(cliente.id).set(cliente).then(()=>{
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

}
