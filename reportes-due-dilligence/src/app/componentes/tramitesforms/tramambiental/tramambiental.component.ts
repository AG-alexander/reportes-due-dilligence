import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InvestigacionService } from 'src/app/services/services';
import { Investigacioin } from 'src/app/models/modelos';

@Component({
  selector: 'app-tramambiental',
  templateUrl: './tramambiental.component.html',
  styleUrls: ['./tramambiental.component.css']
})
export class TramambientalComponent implements OnInit {

  formAmbiental: FormGroup;
  idinvest: string;
  investigacion: Investigacioin;
  constructor(
    private fB: FormBuilder,
    private activatedRouete: ActivatedRoute,
    private invService: InvestigacionService) { }

  initForm() {
    this.formAmbiental = this.fB.group({
      especieAnimal: ['', Validators.required],
      especieVegetal: ['', Validators.required],
      obserLimitrofes: ['', Validators.required],
      estado: [false, Validators.required],
    });
  }

  saveAmbiental() {
    this.investigacion.tramites.forEach(t => {
      if (t.id == "1CAqbOBTL9lK00Xp2WYK") {
        t["estudio"] = this.formAmbiental.value;
      }
    })
    this.invService.saveinvestigacioin(this.investigacion);
  }

  fillForm(data) {
    this.formAmbiental.controls["especieAnimal"].setValue(data["especieAnimal"]);
    this.formAmbiental.controls["especieVegetal"].setValue(data["especieVegetal"]);
    this.formAmbiental.controls["obserLimitrofes"].setValue(data["obserLimitrofes"]);
    this.formAmbiental.controls["estado"].setValue(data["estado"]);
  }
  
  ngOnInit(): void {
    this.initForm();
    this.idinvest = this.activatedRouete.snapshot.params['id'];
    this.invService.getinvestigacioinById(this.idinvest).subscribe(
      res => {
        this.investigacion = res[0];
        this.investigacion.tramites.forEach(t => {
          if (t.id == "1CAqbOBTL9lK00Xp2WYK") {
            if(t["estudio"]) {
              this.fillForm(t["estudio"]);
            }
          }
        });
        
      }
    );
  }

}
