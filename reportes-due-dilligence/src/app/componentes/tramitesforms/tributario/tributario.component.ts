import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Investigacioin, Tramite } from 'src/app/models/modelos';
import { InvestigacionService } from 'src/app/services/services';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-tributario',
  templateUrl: './tributario.component.html',
  styleUrls: ['./tributario.component.css']
})
export class TributarioComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  idinvest: string;
  formTributario: FormGroup;
  investigacion: Investigacioin;

  constructor(
    private fB: FormBuilder,
    private activatedRouete: ActivatedRoute,
    private invService: InvestigacionService
  ) { }

  initForm() {
    this.formTributario = this.fB.group({
      deuda: ['', Validators.required],
      impuestos: ['', Validators.required],
      hipotecas: ['', Validators.required],
      estado: [false, Validators.required],
    });
  }

  saveTributario() {
    this.investigacion.tramites.forEach(t => {
      if (t.id == "j8rW7P2mohlh5wy3pW49") {
        t["estudio"] = this.formTributario.value;
      }
    })
    this.invService.saveinvestigacioin(this.investigacion);
  }
  getFormControl(form:string){
    return this.formTributario.controls[form];
  }
  fillForm(data) {
    this.formTributario.controls["deuda"].setValue(data["deuda"]);
    this.formTributario.controls["impuestos"].setValue(data["impuestos"]);
    this.formTributario.controls["hipotecas"].setValue(data["hipotecas"]);
    this.formTributario.controls["estado"].setValue(data["estado"]);
  }
  
  ngOnInit(): void {
    this.initForm();
    this.idinvest = this.activatedRouete.snapshot.params['id'];
    this.blockUI.start("Cargando Datos");
    this.invService.getinvestigacioinById(this.idinvest).subscribe(
      res => {
        this.investigacion = res[0];
        this.investigacion.tramites.forEach(t => {
          if (t.id == "j8rW7P2mohlh5wy3pW49") {
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
