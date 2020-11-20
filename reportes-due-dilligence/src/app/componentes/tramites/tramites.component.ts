import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tramite } from 'src/app/models/modelos';
import { TramiteService } from 'src/app/services/services';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.css']
})
export class TramitesComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  fgCliente: FormGroup;
  listaTramites:Tramite[] = []

  constructor(
    private fB: FormBuilder,
    private tramiteService: TramiteService,
    private router: Router) { 
   }

  ngOnInit(): void {
    this.fiillist();
  }

  ModificarCrearNuevoTramite(id:number){
    this.router.navigate([`manttramite/${id}`]);
  }

  deleteTramite(id: string) {
    this.tramiteService.deleteTramites(id);
  }

  fiillist(){
    this.blockUI.start("Cargando Datos");
    this.tramiteService.getTramites().subscribe(
      res => {
        this.listaTramites = res;
        this.blockUI.stop();
      }
    );
  }

}
