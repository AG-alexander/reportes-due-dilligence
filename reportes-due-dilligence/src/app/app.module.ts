import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  MantclienteComponent,
  InvestigacionComponent,
  TramitesComponent,
  ManttramiteComponent,
  MantinvestigacionComponent,
  TopograficoComponent,
  TramambientalComponent,
  TramariesgosComponent,
  TramlegalComponent,
  TributarioComponent
} from './componentes/componentes';


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
    ManttramiteComponent,
    InvestigacionComponent,
    MantinvestigacionComponent,
    TramambientalComponent,
    TramariesgosComponent,
    TramlegalComponent,
    TributarioComponent,
    TopograficoComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
