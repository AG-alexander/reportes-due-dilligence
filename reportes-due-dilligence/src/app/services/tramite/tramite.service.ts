import { Injectable } from '@angular/core';
import { DataStorageService } from '../dataStore/data-store.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Tramite } from "../../models/modelos";
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {

  constructor( 
    private dataStorage: DataStorageService, 
    private angularFirestore: AngularFirestore,  
    private location: Location) { }
    
  getTramites(): Observable<Tramite[]> {
    return this.angularFirestore.collection<Tramite>('tramite').valueChanges();
  }

  getTramiteById(id: string): Observable<Tramite[]> {
    return this.angularFirestore.collection<Tramite>('tramite', ref => ref.where('id', '==', id)).valueChanges();
  }

  deleteTramites(id: string) {
    //this.blockUI.start("Guardando cambios");
    this.angularFirestore.collection<Tramite>('tramite').doc(id).delete().then(()=>{
      //this.alertas.successInfoAlert("Eliminado correctamente");
      //this.blockUI.stop();
    }).catch(()=>{
      //this.blockUI.stop();
      //this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo eliminar el registro");
    });
  }

  saveTramite(tramite: Tramite) {
    if (tramite.id != "0") {
    //this.blockUI.start("Guardando cambios");

      this.angularFirestore.collection<Tramite>('tramite').doc(tramite.id).update(tramite).then(()=>{
      //this.blockUI.stop();

        //this.alertas.successInfoAlert("Actualización exitosa");
        this.location.back();
      }).catch((err)=>{
      //this.blockUI.stop();
      
        //this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
        this.location.back();
      });
     
    } else {
      tramite.id = this.angularFirestore.createId();
    //this.blockUI.start("Guardando cambios");

      this.angularFirestore.collection<Tramite>('tramite').doc(tramite.id).set(tramite).then(()=>{
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

  saveInvestigacionInfo(id: string, campo: string, data) {
    if (id != "0") {
      //this.blockUI.start("Guardando cambios");
  
        this.angularFirestore.collection<Tramite>('tramite').doc(id).update(data).then(()=>{
        //this.blockUI.stop();
  
          //this.alertas.successInfoAlert("Actualización exitosa");
          this.location.back();
        }).catch((err)=>{
        //this.blockUI.stop();
        
          //this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
          this.location.back();
        });
       
    }
  }
}
