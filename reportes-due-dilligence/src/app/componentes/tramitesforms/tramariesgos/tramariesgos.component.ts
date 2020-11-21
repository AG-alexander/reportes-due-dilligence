import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Investigacioin, Tramite } from 'src/app/models/modelos';
import { InvestigacionService } from 'src/app/services/services';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-tramariesgos',
  templateUrl: './tramariesgos.component.html',
  styleUrls: ['./tramariesgos.component.css']
})
export class TramariesgosComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  idinvest: string;
  formRiesgos: FormGroup;
  investigacion: Investigacioin;

  constructor(
    private fB: FormBuilder,
    private activatedRouete: ActivatedRoute,
    private invService: InvestigacionService
  ) { }

  initForm() {
    this.formRiesgos = this.fB.group({
      obserZona: ['', Validators.required],
      zonaRiesgo: [false, Validators.required],
      estado: [false, Validators.required],
    });
  }
  getFormControl(form:string){
    return this.formRiesgos.controls[form];
  }
  saveRiesgos() {
    this.investigacion.tramites.forEach(t => {
      if (t.id == "U70iX62RaEy6tSridUda") {
        t["estudio"] = this.formRiesgos.value;
      }
    })
    this.invService.saveinvestigacioin(this.investigacion);
  }

  fillForm(data) {
    this.formRiesgos.controls["obserZona"].setValue(data["obserZona"]);
    this.formRiesgos.controls["zonaRiesgo"].setValue(data["zonaRiesgo"]);
    this.formRiesgos.controls["estado"].setValue(data["estado"]);
  }
  
  ngOnInit(): void {
    this.initForm();
    this.idinvest = this.activatedRouete.snapshot.params['id'];
    this.blockUI.start("Cargando Datos");
    this.invService.getinvestigacioinById(this.idinvest).subscribe(
      res => {
        this.investigacion = res[0];
        this.investigacion.tramites.forEach(t => {
          if (t.id == "U70iX62RaEy6tSridUda") {
            if(t["estudio"]) {
              this.fillForm(t["estudio"]);
            }
          }
        });
        this.blockUI.stop();
      }
    );
  }

}
