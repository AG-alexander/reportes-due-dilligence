import { Injectable } from '@angular/core';
import { DataStorageService } from '../dataStore/data-store.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Investigacioin, Propiedad } from "../../models/modelos";
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class InvestigacionService {

  constructor( 
    private dataStorage: DataStorageService, 
    private angularFirestore: AngularFirestore,  
    private location: Location) { }
    
  getinvestigacioines(): Observable<Investigacioin[]> {
    return this.angularFirestore.collection<Investigacioin>('investigacioin').valueChanges();
  }

  getinvestigacioinById(id: string): Observable<Investigacioin[]> {
    return this.angularFirestore.collection<Investigacioin>('investigacioin', ref => ref.where('id', '==', id)).valueChanges();
  }

  deleteinvestigacioin(id: string) {
    //this.blockUI.start("Guardando cambios");
    this.angularFirestore.collection<Investigacioin>('investigacioin').doc(id).delete().then(()=>{
      //this.alertas.successInfoAlert("Eliminado correctamente");
      //this.blockUI.stop();
    }).catch(()=>{
      //this.blockUI.stop();
      //this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo eliminar el registro");
    });
  }

  saveinvestigacioin(investigacioin: Investigacioin) {
    if (investigacioin.id != "0") {
    //this.blockUI.start("Guardando cambios");

      this.angularFirestore.collection<Investigacioin>('investigacioin').doc(investigacioin.id).update(investigacioin).then(()=>{
      //this.blockUI.stop();

        //this.alertas.successInfoAlert("Actualización exitosa");
        this.location.back();
      }).catch((err)=>{
      //this.blockUI.stop();
      
        //this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
        this.location.back();
      });
     
    } else {
      investigacioin.id = this.angularFirestore.createId();
      investigacioin.propiedades.idCliente= investigacioin.idCliente;
      investigacioin.propiedades.id = this.angularFirestore.createId();
    //this.blockUI.start("Guardando cambios");

    this.angularFirestore.collection<Investigacioin>('Propiedad').doc(investigacioin.propiedades.id).set(investigacioin.propiedades).then(()=>{
      //this.blockUI.stop();

        //this.alertas.successInfoAlert("Inserción exitosa");
        this.angularFirestore.collection<Investigacioin>('investigacioin').doc(investigacioin.id).set(investigacioin).then(()=>{
          //this.blockUI.stop();
    
            //this.alertas.successInfoAlert("Inserción exitosa");
            this.location.back();
          }).catch((err)=>{
          //this.blockUI.stop();
    
            //this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo guardar el nuevo registro");
            this.location.back();
          });
      }).catch((err)=>{
      //this.blockUI.stop();

        //this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo guardar el nuevo registro");
        this.location.back();
      });

      
    }
  }
}
