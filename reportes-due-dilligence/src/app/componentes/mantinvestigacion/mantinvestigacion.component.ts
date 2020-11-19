import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

//Clases
import { Tramite, Investigacioin, Cliente } from 'src/app/models/modelos';
//servicios 
import { TramiteService, InvestigacionService, ClienteService } from './../../services/services'

@Component({
  selector: 'app-mantinvestigacion',
  templateUrl: './mantinvestigacion.component.html',
  styleUrls: ['./mantinvestigacion.component.css']
})
export class MantinvestigacionComponent implements OnInit {

  formInvest: FormGroup;

  listaTramites:Tramite[] = [];
  listaTramitesSeleionada:Tramite[] =[];

  cliente: Cliente;
  name: string = '';
  idinvest: string;
  nombreClientes: string = "";
  cedulaClientes: string = "";

  constructor(
    private tramiteService: TramiteService,
    private fB: FormBuilder,
    private clienteService:ClienteService,
    private investigacionService: InvestigacionService,
    private activatedRouete: ActivatedRoute) { }

  ngOnInit(): void {
    this.getlistTramites();
    this.initForm();
    this.idinvest = this.activatedRouete.snapshot.params['id'];
  }

  initForm() {
    this.formInvest = this.fB.group({
      nombre: [''],
      observaciones: ['']
    });
  }

  getlistTramites(){
    this.tramiteService.getTramites().subscribe(
      res => {
        this.listaTramites = res;
      }
    );
  }

  guardarInvestigacion(){

    let Total = 0;

    for (let i of this.listaTramitesSeleionada) {
      Total += i.costo 
    }

    let investigacioin: Investigacioin ={
      nombre: this.formInvest.controls['nombre'].value,
      cliente: this.cliente,
      observaciones: this.formInvest.controls['observaciones'].value,
      idCliente: this.cliente.id,
      tramites: this.listaTramitesSeleionada,
      porcentajeDeProgreso: 0,
      Estado: 'Iniciado',
      Total: Total,
      propiedades:[],
      fechaCreacion: new Date,
      id: this.idinvest
    };

    this.investigacionService.saveinvestigacioin(investigacioin);

  }

  buscarCliente(){
    this.clienteService.getClienteByIdentification(this.cedulaClientes).subscribe(
      res => {
        this.cliente = res[0];
        this.nombreClientes = this.cliente.nombre
      }
    );

    
  }

  onChange(event, tramiteId) {

    if(event.target.checked){
      let index =  this.listaTramites.findIndex(x =>  x.id === tramiteId);
      this.listaTramitesSeleionada.push(this.listaTramites[index])
    }
    else
    {
      let index =  this.listaTramitesSeleionada.findIndex(x =>  x.id === tramiteId);
      this.listaTramitesSeleionada.splice(index,1)
    }
    console.log(this.listaTramitesSeleionada)
  }

}
