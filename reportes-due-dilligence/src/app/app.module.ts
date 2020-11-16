import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/** 
 * FIREBASE CONFIG
*/
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from "@angular/forms";

import {NgbModule, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

import {
  HomeComponent, 
  LoginComponent, 
  RegisterComponent, 
  SidebarComponent, 
  ClientesComponent,
  MantclienteComponent
} from './componentes/componentes';
import { TramitesComponent } from './componentes/tramites/tramites.component';
import { ManttramiteComponent } from './componentes/manttramite/manttramite.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    ClientesComponent,
    MantclienteComponent,
    TramitesComponent,
    ManttramiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
