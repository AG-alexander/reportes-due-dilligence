import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  url = "https://blooming-brook-10127.herokuapp.com/handle";

  constructor(
    private http: HttpClient
  ) { }

  generatePDF(data) {
    return this.http.post(this.url, data);
  }
}
