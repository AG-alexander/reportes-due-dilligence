import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Cliente } from './../../models/modelos';
import { ClienteService } from "../../services/services";


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  fgCliente: FormGroup;
  listaClientes:Cliente[] = []

  constructor(
    private fB: FormBuilder,
    private clienteService: ClienteService,
    private router: Router) { 
   }

  ngOnInit(): void {
    this.fiillist();
  }

  ModificarCrearNuevoCliente(id:number){
    this.router.navigate([`mantcliente/${id}`]);
  }

  deleteCliente(id: string) {
    this.clienteService.deleteClientes(id);
  }


  fiillist(){
    this.blockUI.start("Cargando Datos");
    this.clienteService.getClientes().subscribe(
      res => {
        this.listaClientes = res;
        this.blockUI.stop();
      }
    );
  }
}


