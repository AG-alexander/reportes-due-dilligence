import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  AlertToastMessage(msn: any, tipo: any) {
    const toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    toast.fire({
      icon: tipo,
      title: msn
    });
  }

  AlertaCenterMessage(msn: any, tipo: any) {
    swal.fire({
      icon: tipo,
      text: msn,
    });
  }
}