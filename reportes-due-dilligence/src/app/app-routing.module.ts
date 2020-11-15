import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  HomeComponent, 
  LoginComponent, 
  RegisterComponent,
  ClientesComponent,
  MantclienteComponent
  } from './componentes/componentes';


const routes: Routes = [
  { path: 'log-in', component: LoginComponent },
  { path: 'sing-up', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cliente', component: ClientesComponent },
  { path: 'mantcliente/:id', component: MantclienteComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
