import { Component, OnInit } from '@angular/core';
import { UsuarioService, DataStorageService } from "../../../services/services";
import { Usuario } from "../../../models/modelos";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  listaUsuario: Usuario[];

  constructor(
    private useService: UsuarioService
  ) { }

  updateUser(usuario: Usuario) {
    usuario.admin = !usuario.admin;
    this.useService.saveusuarioRol(usuario);
  }

  ngOnInit(): void {
    this.useService.getusuarios().subscribe(
      res => {
        this.listaUsuario = res;
      }
    );
  }

}
