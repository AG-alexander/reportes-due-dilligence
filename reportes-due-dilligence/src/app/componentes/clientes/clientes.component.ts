import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {Cliente} from './../../models/modelos';


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
    private router: Router) { 
   }

  ngOnInit(): void {
    this.fiillist();
  }

  ModificarCrearNuevoCliente(id:number){
    this.router.navigate([`mantcliente/${id}`]);
  }

  EliminarCliente(id:number){

  }


  fiillist(){

    var cliente1:Cliente = { 
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
    this.listaClientes.push(cliente2)
  }
}


