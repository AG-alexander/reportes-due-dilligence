import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tramite } from 'src/app/models/modelos';
import { TramiteService } from 'src/app/services/services';
@Component({
  selector: 'app-manttramite',
  templateUrl: './manttramite.component.html',
  styleUrls: ['./manttramite.component.css']
})
export class ManttramiteComponent implements OnInit {

  iduser:number;
  formTramite: FormGroup;
  closeResult: string;
  tramite: Tramite;

  constructor(
    private fB: FormBuilder,
    private activatedRouete: ActivatedRoute,
    private tramiteService: TramiteService,
    ) { }

    /*open(content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }*/
  
    /*private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }*/

  initForm() {
    this.formTramite = this.fB.group({
      nombre: ['', Validators.required],
      costo: [0, Validators.required],
    });
  }

  initFormEdit() {
    this.formTramite = this.fB.group({
      nombre: [this.tramite.nombre, Validators.required],
      costo: [this.tramite.costo, Validators.required]
    });
  }

  get nombre() {
    return this.formTramite.controls["nombre"];
  }
  get costo() {
    return this.formTramite.controls["costo"];
  }

  saveTramite() {
    let tramite = this.formTramite.value as Tramite;
    tramite.id = this.iduser.toString();
    this.tramiteService.saveTramite(tramite);
  }

  getTramite() {
    this.tramiteService.getTramiteById(this.iduser.toString()).subscribe(
      res => {
       this.tramite = res[0];
        
       this.costo.setValue(this.tramite.costo);
      }
    );
  }

  ngOnInit(): void {
    this.iduser = this.activatedRouete.snapshot.params['id'];

    if(this.iduser > 0){
      this.cargarInfo(this.iduser)
      this.initForm();
    }
    else{
      this.initForm();
      this.getTramite();
      console.log(`vamos a crear un nuevo Id`)
    }

  }

  cargarInfo(id:number){
    console.log(`Id a editar ${id}`)
  }

}
