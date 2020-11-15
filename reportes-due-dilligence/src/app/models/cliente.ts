import { Contacto } from "./contacto";
import { Propiedad } from "./propiedad";

export interface Cliente {
    id?: string;
    nombre: string;
    tipoPersona: string;
    contactos: Contacto[];
    propiedades: Propiedad[];
}