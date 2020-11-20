import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { Investigacioin, Cliente, Tramite } from 'src/app/models/modelos';
import { TramiteService, InvestigacionService, PdfService } from './../../services/services'

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
    private investigacionService:InvestigacionService,
    private pdfService: PdfService ){ }

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
    // var cliente:Cliente = { 
    //   nombre: "Alex",
    //   tipo: 1,
    //   identificacion: "112450987",
    //   id: "2",
    //   contactos:[]                      
    // }

    // var tram:Tramite[] = []
    // tram.push(this.listaTramites[0])
    // tram.push(this.listaTramites[2])
    // tram.push(this.listaTramites[4])

    // var Invest:Investigacioin = { 
    //   nombre: "Investigacion 1",
    //   idCliente: "112450987",
    //   cliente: cliente,
    //   id: "1",
    //   tramites: tram,
    //   Estado: "Procesando",
    //   observaciones:"",
    //   porcentajeDeProgreso:0,
    //   propiedades:[],
    //   fechaCreacion: new Date,
    //   Total: 0
    // }
    // this.listaInvest.push(Invest)
  
    // var cliente:Cliente = { 
    //   nombre: "Alan",
    //   tipo: 1,
    //   identificacion: "112940144",
    //   id: "2",
    //   contactos:[]                      
    // }

    // var tram:Tramite[] = []
    // tram.push(this.listaTramites[0])
    // tram.push(this.listaTramites[1])
    // tram.push(this.listaTramites[3])

    // var Invest:Investigacioin = { 
    //   nombre: "Investigacion 2",
    //   idCliente: "112940144",
    //   cliente: cliente,
    //   id: "2",
    //   tramites: tram,
    //   Estado: "Procesando",
    //   observaciones:"",
    //   porcentajeDeProgreso:0,
    //   propiedades:[],
    //   fechaCreacion: new Date,
    //   Total: 0
    // }
    // this.listaInvest.push(Invest)
    // this.getTotal()
   
  }

  getTotal(){
    for (let inves of this.listaInvest) {
      for (let i of inves.tramites) {
        inves.Total += i.costo 
      }
      console.log(inves) 
    }
  }

  generarPDF(id: string) {
    this.investigacionService.getinvestigacioinById(id).subscribe(
      res => {
        console.log(1);
        this.pdfService.generatePDF(res).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      });
  }

}
