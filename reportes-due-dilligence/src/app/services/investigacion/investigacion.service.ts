import { Injectable } from '@angular/core';
import { DataStorageService } from '../dataStore/data-store.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Investigacioin, Propiedad } from "../../models/modelos";
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { AlertService } from './../alert/alert.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Injectable({
  providedIn: 'root'
})
export class InvestigacionService {
  @BlockUI() blockUI: NgBlockUI;
  constructor( 
    private dataStorage: DataStorageService, 
    private angularFirestore: AngularFirestore,  
    private location: Location,
    private alertas: AlertService) { }
    
  getinvestigacioines(): Observable<Investigacioin[]> {
    return this.angularFirestore.collection<Investigacioin>('investigacioin').valueChanges();
  }

  getinvestigacioinById(id: string): Observable<Investigacioin[]> {
    return this.angularFirestore.collection<Investigacioin>('investigacioin', ref => ref.where('id', '==', id)).valueChanges();
  }

  deleteinvestigacioin(id: string) {
      this.blockUI.start("Guardando cambios");
      this.angularFirestore.collection<Investigacioin>('investigacioin').doc(id).delete().then(()=>{
      this.alertas.AlertToastMessage("Eliminado correctamente", 'success');
      this.blockUI.stop();
    }).catch(()=>{
      this.blockUI.stop();
      this.alertas.AlertaCenterMessage("Ha ocurrido un error, no se pudo eliminar el registro", 'error');
    });
  }

  saveinvestigacioin(investigacioin: Investigacioin) {
    if (investigacioin.id != "0") {
      this.blockUI.start("Guardando cambios");
      this.angularFirestore.collection<Investigacioin>('investigacioin').doc(investigacioin.id).update(investigacioin).then(()=>{
      this.blockUI.stop();
      this.alertas.AlertToastMessage("Actualización exitosa",'success');
      this.location.back();
    }).catch((err)=>{
    this.blockUI.stop();
      this.alertas.AlertaCenterMessage("Ha ocurrido un error en la actualización", 'error');
    this.location.back();
    });
    
    } else {
      investigacioin.id = this.angularFirestore.createId();
      investigacioin.propiedades.idCliente= investigacioin.idCliente;
      investigacioin.propiedades.id = this.angularFirestore.createId();
      this.blockUI.start("generando propiedades");
      this.angularFirestore.collection<Propiedad>('Propiedad').doc(investigacioin.propiedades.id).set(investigacioin.propiedades).then(()=>{
        this.blockUI.start("Guardando cambios");
        this.angularFirestore.collection<Investigacioin>('investigacioin').doc(investigacioin.id).set(investigacioin).then(()=>{
          this.blockUI.stop();
          this.alertas.AlertToastMessage("Inserción exitosa",'success');
          this.location.back();
        }).catch((err)=>{
          this.blockUI.stop();
          this.alertas.AlertaCenterMessage("Ha ocurrido un error, no se pudo guardar el nuevo registro", 'error');
          this.location.back();
        });
    }).catch((err)=>{
      this.blockUI.stop();
      this.alertas.AlertaCenterMessage("Ha ocurrido un error, no se pudo generar la propiedad", 'error');
      this.location.back();
    });
    
    
    }
    }

  saveInvestigacionInfo(id: string, campo: string, data) {
    let refInv = this.angularFirestore.collection<Investigacioin>('investigacioin').doc(id);
debugger
        console.log(refInv['tramites']);
    /*if (id != "0") {
      //this.blockUI.start("Guardando cambios");
        

        this.angularFirestore.collection<Investigacioin>('investigacioin').doc(id).update().then(()=>{
        //this.blockUI.stop();
  
          //this.alertas.successInfoAlert("Actualización exitosa");
          this.location.back();
        }).catch((err)=>{
        //this.blockUI.stop();
        
          //this.alertas.errorInfoAlert("Ha ocurrido un error en la actualización");
          this.location.back();
        });
       
      } else {
        id = this.angularFirestore.createId();
      //this.blockUI.start("Guardando cambios");
  
        this.angularFirestore.collection<Investigacioin>('investigacioin').doc(id).set().then(()=>{
        //this.blockUI.stop();
  
          //this.alertas.successInfoAlert("Inserción exitosa");
          this.location.back();
        }).catch((err)=>{
        //this.blockUI.stop();
  
          //this.alertas.errorInfoAlert("Ha ocurrido un error, no se pudo guardar el nuevo registro");
          this.location.back();
        });
      }*/
  }

}
