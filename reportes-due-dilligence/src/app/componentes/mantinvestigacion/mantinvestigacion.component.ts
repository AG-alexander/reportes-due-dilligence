import { Component, OnInit } from '@angular/core';
import { Tramite } from 'src/app/models/modelos';
import { TramiteService } from './../../services/services'

@Component({
  selector: 'app-mantinvestigacion',
  templateUrl: './mantinvestigacion.component.html',
  styleUrls: ['./mantinvestigacion.component.css']
})
export class MantinvestigacionComponent implements OnInit {
  listaTramites:Tramite[] = []
  constructor(private tramiteService: TramiteService) { }

  ngOnInit(): void {
    this.getlistTramites();
  }

  getlistTramites(){
    this.tramiteService.getTramites().subscribe(
      res => {
        this.listaTramites = res;
      }
    );
  }

  onChange(event, tramiteId) {
   console.log(`${event.target.checked} ${tramiteId}`)
  }

}
