import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Investigacioin, Tramite } from 'src/app/models/modelos';
import { InvestigacionService } from 'src/app/services/services';

@Component({
  selector: 'app-tramlegal',
  templateUrl: './tramlegal.component.html',
  styleUrls: ['./tramlegal.component.css']
})
export class TramlegalComponent implements OnInit {
  idinvest: string;
  formLegal: FormGroup;
  investigacion: Investigacioin;

  constructor(
    private fB: FormBuilder,
    private activatedRouete: ActivatedRoute,
    private invService: InvestigacionService
  ) { }

  initForm() {
    this.formLegal = this.fB.group({
      demandas: ['', Validators.required],
      estado: [false, Validators.required],
    });
  }

  fillForm(data) {
    this.formLegal.controls["demandas"].setValue(data["demandas"]);
    this.formLegal.controls["estado"].setValue(data["estado"]);
  }

  saveLegal() {
    this.investigacion.tramites.forEach(t => {
      if (t.id == "XYM2cTJUeyMbw07PEeR2") {
        t["estudio"] = this.formLegal.value;
      }
    })
    this.invService.saveinvestigacioin(this.investigacion);
  }
  
  ngOnInit(): void {
    this.initForm();
    this.idinvest = this.activatedRouete.snapshot.params['id'];
    this.invService.getinvestigacioinById(this.idinvest).subscribe(
      res => {
        this.investigacion = res[0];
        this.investigacion.tramites.forEach(t => {
          if (t.id == "XYM2cTJUeyMbw07PEeR2") {
            if(t["estudio"]) {
              this.fillForm(t["estudio"]);
            }
          }
        });
        
      }
    );
  }

}
