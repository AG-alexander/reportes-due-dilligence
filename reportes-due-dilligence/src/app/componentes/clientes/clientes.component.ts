import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Cliente } from './../../models/modelos';
import { ClienteService } from "../../services/services";


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
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

    this.clienteService.getClientes().subscribe(
      res => {
        this.listaClientes = res;
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


