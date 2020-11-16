import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  setObjectValue = (key: string, objectValue: any) => {
    if (window.localStorage) {
      localStorage.setItem(key, JSON.stringify(objectValue));
    } else {
      throw new Error('No se puede almacenar la información, porque no está habilitado el localStorage');
    }
  }
  getObjectValue = (key: string) => {
    if (window.localStorage) {
      let exist = localStorage.getItem(key);
      if (exist == "undefined") {
        return null;
      }
      const DATA = JSON.parse(exist);
      if (DATA) {
        return DATA;
      } else {
        this.setObjectValue(key, null);
        return null;
        // throw new Error(`No se encontró el valor ${key} en el localStorage`);
      }
    } else {
      // throw new Error('No se puede obtener la información, porque no está habilitado el localStorage');
      return null;
    }
  }
}