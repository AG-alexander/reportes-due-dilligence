import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Tramite } from 'src/app/models/modelos';
import { TramiteService } from 'src/app/services/services';

@Component({
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: ['./tramites.component.css']
})
export class TramitesComponent implements OnInit {

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

    this.tramiteService.getTramites().subscribe(
      res => {
        this.listaTramites = res;
      }
    );

    /*var cliente1:Cliente = { 
      nombre: "Alan",
      tipo: 1,
      identidficacion: "112940144",
      id: "1",
      contactos:[]                      
    }
    this.listaClientes.push(cliente1)
  
    var cliente2:Cliente = { 
      nombre: "Alex",
      tipo: 1,
      identidficacion: "112450987",
      id: "2",
      contactos:[]                      
    }
    this.listaClientes.push(cliente2)*/
  }

}
