import { Contacto } from "./contacto";
//import { Propiedad } from "./propiedad";

export interface Cliente {
    id?: string;
    nombre: string;
    tipo: number;
    identificacion: string;
    contactos: Contacto[];
    //propiedades: Propiedad[];
}