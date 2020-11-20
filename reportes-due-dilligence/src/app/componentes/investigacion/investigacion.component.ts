import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { Investigacioin, Cliente, Tramite } from 'src/app/models/modelos';
import { TramiteService, InvestigacionService } from './../../services/services'

@Component({
  selector: 'app-investigacion',
  templateUrl: './investigacion.component.html',
  styleUrls: ['./investigacion.component.css']
})
export class InvestigacionComponent implements OnInit {
  listaInvest:Investigacioin[] = []
  listaTramites:Tramite[] = []
  constructor(
    private tramiteService: TramiteService,
    private router: Router,
    private investigacionService:InvestigacionService){ }

  ngOnInit(): void {
    this.getlistTramites()
  }

  getlistTramites(){
    this.tramiteService.getTramites().subscribe(
      res => {
        this.listaTramites = res;
        this.fiillist()
      }
    );
  }

  ModificarCrearNuevoTrabajo(id:number){
    this.router.navigate([`mantinvestigacion/${id}`]);
  }

  fiillist(){

    this.investigacionService.getinvestigacioines().subscribe(
      res => {
        this.listaInvest = res;
        console.log(this.listaInvest)
      }
    );
  }

  DeleteTrabajo(investid){
    this.investigacionService.deleteinvestigacioin(investid);
  }

  // getTotal(){
  //   for (let inves of this.listaInvest) {
  //     for (let i of inves.tramites) {
  //       inves.Total += i.costo 
  //     }
  //     console.log(inves) 
  //   }
  // }

}
