import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InvestigacionService } from 'src/app/services/services';
import { Investigacioin } from 'src/app/models/modelos';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
// import { AlertService } from './../../services/alert/alert.service';

@Component({
  selector: 'app-topografico',
  templateUrl: './topografico.component.html',
  styleUrls: ['./topografico.component.css']
})
export class TopograficoComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  idinvest: string;
  formTopografico: FormGroup;
  investigacion: Investigacioin;

  constructor(
    private fB: FormBuilder,
    private activatedRouete: ActivatedRoute,
    private invService: InvestigacionService) { }

  initForm() {
    this.formTopografico = this.fB.group({
      tipoSuelo: ['', Validators.required],
      locacion: ['', Validators.required],
      altura: ['', Validators.required],
      coordenadas: ['', Validators.required],
      estado: [false, Validators.required]
    });
  }

  saveTopografico() {
    this.investigacion.tramites.forEach(t => {
      if (t.id == "ntWqBtVEnI3qZHkOYhym") {
        t["estudio"] = this.formTopografico.value;
      }
    })
    this.invService.saveinvestigacioin(this.investigacion);
  }

  getFormControl(form:string){
    return this.formTopografico.controls[form];
  }

  fillForm(data) {
    this.getFormControl("tipoSuelo").setValue(data["tipoSuelo"]);
    this.formTopografico.controls["locacion"].setValue(data["locacion"]);
    this.formTopografico.controls["altura"].setValue(data["altura"]);
    this.formTopografico.controls["coordenadas"].setValue(data["coordenadas"]);
    this.formTopografico.controls["estado"].setValue(data["estado"]);
  }

  ngOnInit(): void {
    this.initForm();
    this.idinvest = this.activatedRouete.snapshot.params['id'];
    this.blockUI.start("Cargando Datos");
    this.invService.getinvestigacioinById(this.idinvest).subscribe(
      res => {
        this.investigacion = res[0];
        this.investigacion.tramites.forEach(t => {
          if (t.id == "ntWqBtVEnI3qZHkOYhym") {
            if (t["estudio"]) {
              this.fillForm(t["estudio"]);
              
            }
          }
        });
        this.blockUI.stop();
      }
    );
  }

}
