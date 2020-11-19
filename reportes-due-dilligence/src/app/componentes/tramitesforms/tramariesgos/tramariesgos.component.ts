import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TramiteService } from 'src/app/services/services';

@Component({
  selector: 'app-tramariesgos',
  templateUrl: './tramariesgos.component.html',
  styleUrls: ['./tramariesgos.component.css']
})
export class TramariesgosComponent implements OnInit {

  iduser: number;
  formRiesgos: FormGroup;

  constructor(
    private fB: FormBuilder,
    private activatedRouete: ActivatedRoute,
    private tramiteService: TramiteService
  ) { }

  initForm() {
    this.formRiesgos = this.fB.group({
      especieAnimal: ['', Validators.required],
      especieVegetal: ['', Validators.required],
      obserLimitrofes: ['', Validators.required],
      estado: [false, Validators.required],
    });
  }

  saveRiesgos() {}
  
  ngOnInit(): void {
  }

}
