import { Component, OnInit } from '@angular/core';
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
  
  iduser:number;
  formCliente: FormGroup;
  formContacto: FormGroup;
  contactIndex: number;
  closeResult: string;
  cliente: Cliente;

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
      contactos: [[], [Validators.required, listValidator]]
    });
  }

  initFormEdit() {
    this.formCliente = this.fB.group({
      nombre: [this.cliente.nombre, Validators.required],
      tipo: [this.cliente.tipo, Validators.required],
      identificacion: [this.cliente.identificacion, Validators.required],
      contactos: [this.cliente.contactos, [Validators.required, listValidator]]
    });
  }

  initContactoForm() {
    this.formContacto = this.fB.group({
      contactoDescription: ['', [Validators.required]]
    });
  }

  get nombre() {
    return this.formCliente.controls["nombre"];
  }
  get tipo() {
    return this.formCliente.controls["tipo"];
  }
  get identificacion() {
    return this.formCliente.controls["identificacion"];
  }
  get contactos() {
    return this.formCliente.controls["contactos"];
  }
  get contactoDescription() {
    return this.formContacto.controls["contactoDescription"];
  }

  deleteContact(index) {
    let contactListAux = this.contactos.value as Contacto[];
    contactListAux.splice(index, 1);
    this.contactos.setValue(contactListAux);
  }

  addContact() {
    let description = this.contactoDescription.value;

    let contact: Contacto = {
      contacto: description,
      tipoContacto: ""
    }

    let contactoListAux = this.contactos.value as Contacto[];

    contactoListAux.push(contact);

    this.contactos.setValue(contactoListAux);
    this.formContacto.reset();
  }

  editContact() {
    if (this.contactIndex >= 0) {
      let contactoListAux = this.contactos.value as Contacto[];

      let description = this.contactoDescription.value;

      let contactoInList = contactoListAux[this.contactIndex];

      contactoInList.contacto = description;

      contactoListAux[this.contactIndex] = contactoInList;

      this.contactIndex = -1;

      this.contactos.setValue(contactoListAux);
      this.formContacto.reset();
    }
  }

  setEditContact(index, contactModal) {
    this.contactIndex = index;
    let contactListAux = this.contactos.value as Contacto[];
    let contactData = contactListAux[this.contactIndex];
    this.contactoDescription.setValue(contactData.contacto);
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
    this.clienteService.getClienteById(this.iduser.toString()).subscribe(
      res => {
       this.cliente = res[0];
       this.nombre.setValue(this.cliente.nombre);
       this.tipo.setValue(this.cliente.tipo);
       this.identificacion.setValue(this.cliente.identificacion);
       this.contactos.setValue(this.cliente.contactos);
      }
    );
  }

  ngOnInit(): void {
    this.iduser = this.activatedRouete.snapshot.params['id'];

    if(this.iduser > 0){
      this.cargarInfo(this.iduser)
      this.initForm();
      this.initContactoForm();
    }
    else{
      this.initForm();
      this.initContactoForm();
      this.getCliente();
      console.log(`vamos a crear un nuevo Id`)
    }

  }

  cargarInfo(id:number){
    console.log(`Id a editar ${id}`)
  }

}
