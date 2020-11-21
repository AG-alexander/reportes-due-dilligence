import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
//Clases
import { Tramite, Investigacioin, Cliente, Propiedad } from 'src/app/models/modelos';
//servicios 
import { TramiteService, InvestigacionService, ClienteService } from './../../services/services'

@Component({
  selector: 'app-mantinvestigacion',
  templateUrl: './mantinvestigacion.component.html',
  styleUrls: ['./mantinvestigacion.component.css']
})
export class MantinvestigacionComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  formInvest: FormGroup;

  listaTramites:Tramite[] = [];
  listaTramitesSeleionada:Tramite[] =[];

  cliente: Cliente;
  titulo:string ='';
  name: string = '';
  idinvest: string;
  nombreClientes: string = "";
  cedulaClientes: string = "";
  EditorInvest: Investigacioin;
  isChecked:boolean = true;

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
    
    if(this.idinvest !== "0"){
      
      this.titulo = "Modificar investigación"
      this.getInvest(); 
    }
    else{
      this.titulo = "Crear investigación"
    }
  }

  initForm() {
    this.formInvest = this.fB.group({
      nombre: ['', Validators.required],
      observaciones: [''],
      tipoLocacion:['', Validators.required],
      direccionPropiedad:['', Validators.required],
      tamanno:[0, Validators.required]
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

    let prop: Propiedad = {
      direccionPropiedad: this.formInvest.controls['direccionPropiedad'].value,
      tamanno: this.formInvest.controls['tamanno'].value,
      tipoLocacion:this.formInvest.controls['tipoLocacion'].value,
      idCliente:this.cliente.id,
      id:"0"
    }

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
      propiedades: prop,
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

  getInvest() {
    this.blockUI.start("Cargando Datos");
    this.investigacionService.getinvestigacioinById(this.idinvest.toString()).subscribe(
      res => {
        this.EditorInvest = res[0];
        this.cedulaClientes = this.EditorInvest.cliente.identificacion; 
        this.nombreClientes = this.EditorInvest.cliente.nombre; 
        this.getFormControl('nombre').setValue(this.EditorInvest.nombre);
        this.getFormControl('observaciones').setValue(this.EditorInvest.nombre);
        this.getFormControl('tipoLocacion').setValue(this.EditorInvest.propiedades.tipoLocacion);
        this.getFormControl('direccionPropiedad').setValue(this.EditorInvest.propiedades.direccionPropiedad);
        this.getFormControl('tamanno').setValue(this.EditorInvest.propiedades.tamanno);
        this.cliente  = this.EditorInvest.cliente
        for (let i of this.listaTramites) {
          let index =  this.EditorInvest.tramites.findIndex(x =>  x.id === i.id);
          if(index !== -1){
            i.estado = true;
          }
          else{
            i.estado = false;
          }
        }
        this.listaTramitesSeleionada = this.EditorInvest.tramites
        this.blockUI.stop();
        console.log(this.listaTramites);
      }
    );
  }

  getFormControl(tipe:string) {
    return this.formInvest.controls[tipe];
  }

}
