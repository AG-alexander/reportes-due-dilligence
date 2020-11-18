import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TramiteService } from 'src/app/services/services';

@Component({
  selector: 'app-tramambiental',
  templateUrl: './tramambiental.component.html',
  styleUrls: ['./tramambiental.component.css']
})
export class TramambientalComponent implements OnInit {

  iduser: number;
  formAmbiental: FormGroup;

  constructor(
    private fB: FormBuilder,
    private activatedRouete: ActivatedRoute,
    private tramiteService: TramiteService
  ) { }

  initForm() {
    this.formAmbiental = this.fB.group({
      especieAnimal: ['', Validators.required],
      especieVegetal: ['', Validators.required],
      obserLimitrofes: ['', Validators.required],
      estado: [false, Validators.required],
    });
  }

  saveAmbiental() {}

  ngOnInit(): void {
  }

}
