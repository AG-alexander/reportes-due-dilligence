import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NormalGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';

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
  TributarioComponent,
  AuthComponent
  } from './componentes/componentes';


const routes: Routes = [
  { path: 'log-in', component: LoginComponent },
  { path: 'sing-up', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [NormalGuard] },
  { path: 'cliente', component: ClientesComponent, canActivate: [NormalGuard] },
  { path: 'mantcliente/:id', component: MantclienteComponent, canActivate: [NormalGuard] },
  { path: 'tramite', component: TramitesComponent, canActivate: [NormalGuard/*, AdminGuard*/ ]},
  { path: 'investigacion', component: InvestigacionComponent, canActivate: [NormalGuard] },
  { path: 'manttramite/:id', component: ManttramiteComponent, canActivate: [NormalGuard] },
  { path: 'mantinvestigacion/:id', component: MantinvestigacionComponent, canActivate: [NormalGuard] },
  { path: 'tramiteTopografico/:id', component: TopograficoComponent, canActivate: [NormalGuard] },
  { path: 'tramiteambiental/:id', component: TramambientalComponent, canActivate: [NormalGuard] },
  { path: 'tramiteriesgos/:id', component: TramariesgosComponent, canActivate: [NormalGuard]},
  { path: 'tramitelegal/:id', component:  TramlegalComponent, canActivate: [NormalGuard]},
  { path: 'tramiteTributario/:id', component: TributarioComponent, canActivate: [NormalGuard] },
  { path: 'usuario-administracion', component: AuthComponent, canActivate: [NormalGuard, AdminGuard] },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
