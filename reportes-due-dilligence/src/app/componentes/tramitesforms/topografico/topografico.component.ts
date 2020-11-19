import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TramiteService } from 'src/app/services/services';
@Component({
  selector: 'app-topografico',
  templateUrl: './topografico.component.html',
  styleUrls: ['./topografico.component.css']
})
export class TopograficoComponent implements OnInit {

  iduser: number;
  formTopografico: FormGroup;

  constructor(
    private fB: FormBuilder,
    private activatedRouete: ActivatedRoute,
    private tramiteService: TramiteService) { }

  initForm() {
    this.formTopografico = this.fB.group({
      tipoSuelo: ['', Validators.required],
      locacion: ['', Validators.required],
      altura: ['', Validators.required],
      coordenadas: ['', Validators.required],
      estado: [false, Validators.required]
    });
  }

  saveTopografico() {}

    ngOnInit(): void {
      this.initForm();
    }

  }
