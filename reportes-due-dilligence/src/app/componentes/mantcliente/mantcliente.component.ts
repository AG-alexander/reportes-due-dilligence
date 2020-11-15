import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mantcliente',
  templateUrl: './mantcliente.component.html',
  styleUrls: ['./mantcliente.component.css']
})
export class MantclienteComponent implements OnInit {
  iduser:number;
  constructor(private activatedRouete: ActivatedRoute) { }

  ngOnInit(): void {
    this.iduser = this.activatedRouete.snapshot.params['id'];

    if(this.iduser > 0){
      this.cargarInfo(this.iduser)
    }
    else{
      console.log(`vamos a crear un nuevo Id`)
    }

  }

  cargarInfo(id:number){
    console.log(`Id a editar ${id}`)
  }

}
