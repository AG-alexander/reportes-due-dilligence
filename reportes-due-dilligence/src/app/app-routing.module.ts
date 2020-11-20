import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  HomeComponent, 
  LoginComponent, 
  RegisterComponent,
  ClientesComponent,
  MantclienteComponent,
  TramitesComponent,
  ManttramiteComponent,
  InvestigacionComponent,
  MantinvestigacionComponent,
  TopograficoComponent,
  TramambientalComponent,
  TramariesgosComponent,
  TramlegalComponent,
  TributarioComponent
  } from './componentes/componentes';


const routes: Routes = [
  { path: 'log-in', component: LoginComponent },
  { path: 'sing-up', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cliente', component: ClientesComponent },
  { path: 'mantcliente/:id', component: MantclienteComponent },
  { path: 'tramite', component: TramitesComponent },
  { path: 'investigacion', component: InvestigacionComponent },
  { path: 'manttramite/:id', component: ManttramiteComponent },
  { path: 'mantinvestigacion/:id', component: MantinvestigacionComponent },
  { path: 'tramiteTopografico/:id', component: TopograficoComponent },
  { path: 'tramiteambiental/:id', component: TramambientalComponent },
  { path: 'tramiteriesgos/:id', component: TramariesgosComponent},
  { path: 'tramitelegal/:id', component:  TramlegalComponent},
  { path: 'tramiteTributario/:id', component: TributarioComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
