import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cliente, Contacto } from 'src/app/models/modelos';
import { ClienteService } from 'src/app/services/services';
import { listValidator } from 'src/app/validator/arrayLength';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mantcliente',
  templateUrl: './mantcliente.component.html',
  styleUrls: ['./mantcliente.component.css']
})
export class MantclienteComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  iduser:string;
  formCliente: FormGroup;
  formContacto: FormGroup;
  contactIndex: number;
  closeResult: string;
  cliente: Cliente;
  titulo:string ='';

  constructor(
    private fB: FormBuilder,
    private activatedRouete: ActivatedRoute,
    private clienteService: ClienteService,
    private modalService: NgbModal,) { }

    open(content) {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }

  initForm() {
    this.formCliente = this.fB.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      identificacion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactos: [[], [Validators.required, listValidator]]
    });
  }

  initFormEdit() {
    this.formCliente = this.fB.group({
      nombre: [this.cliente.nombre, Validators.required],
      tipo: [this.cliente.tipo, Validators.required],
      identificacion: [this.cliente.identificacion, Validators.required],
      email: [this.cliente.email, Validators.required],
      contactos: [this.cliente.contactos, [Validators.required, listValidator]]
    });
  }

  initContactoForm() {
    this.formContacto = this.fB.group({
      contactoDescription: ['', [Validators.required]]
    });
  }

  getFormControl(tipe:string) {
    return this.formCliente.controls[tipe];
  }

  getContactoControl(tipe:string) {
    return this.formContacto.controls[tipe];
  }
  // get contactoDescription() {
  //   return this.formContacto.controls["contactoDescription"];
  // }
  deleteContact(index) {
    let contactListAux = this.getFormControl('contactos').value as Contacto[];
    contactListAux.splice(index, 1);
    this.getFormControl('contactos').setValue(contactListAux);
  }

  addContact() {
    let description = this.getContactoControl('contactoDescription').value as string;

    let contact: Contacto = {
      contacto: description,
      tipoContacto: ""
    }

    let contactoListAux =this.getFormControl('contactos').value as Contacto[];

    contactoListAux.push(contact);

    this.getFormControl('contactos').setValue(contactoListAux);
    this.formContacto.reset();
  }

  editContact() {
    if (this.contactIndex >= 0) {
      let contactoListAux = this.getFormControl('contactos').value as Contacto[];

      let description = this.getContactoControl('contactoDescription').value as string;

      let contactoInList = contactoListAux[this.contactIndex];

      contactoInList.contacto = description;

      contactoListAux[this.contactIndex] = contactoInList;

      this.contactIndex = -1;

      this.getFormControl('contactos').setValue(contactoListAux);
      this.formContacto.reset();
    }
  }

  setEditContact(index, contactModal) {
    this.contactIndex = index;
    let contactListAux = this.getFormControl('contactos').value as Contacto[];
    let contactData = contactListAux[this.contactIndex];
    this.getFormControl('contactos').setValue(contactData.contacto);
    this.open(contactModal);
  }

  saveContact(modal) {
    if (this.contactIndex >= 0) {
      this.editContact();
    } else {
      this.addContact();
    }
    this.formContacto.reset();
    modal.dismiss();
  }

  saveCliente() {
    let cliente = this.formCliente.value as Cliente;
    cliente.id = this.iduser.toString();
    this.clienteService.saveCliente(cliente);
  }

  getCliente() {
    this.blockUI.start("Cargando Datos");
    this.clienteService.getClienteById(this.iduser.toString()).subscribe(
      res => {
       this.cliente = res[0];
       this.getFormControl('nombre').setValue(this.cliente.nombre);
       this.getFormControl('tipo').setValue(this.cliente.tipo);
       this.getFormControl('identificacion').setValue(this.cliente.identificacion);
       this.getFormControl('contactos').setValue(this.cliente.contactos);
       this.getFormControl('email').setValue(this.cliente.email);
       this.blockUI.stop();
      }
    );
  }

  ngOnInit(): void {
    this.iduser = this.activatedRouete.snapshot.params['id'];

    if(this.iduser === "0"){
      this.initForm();
      this.initContactoForm();
      this.titulo = "Crear cliente"
    }
    else{
      this.titulo = "Modificar cliente"
      this.initForm();
      this.initContactoForm();
      this.getCliente();
    }

  }

}
