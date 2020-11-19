import { Cliente } from "./cliente";
import { Propiedad } from "./propiedad";
import { Tramite } from "./tramite";

export interface Investigacioin {
    id?: string;
    idCliente?: string;
    cliente?: Cliente;
    nombre: string;
    tramites: Tramite[];
    propiedades: Propiedad[];
    observaciones: string;
    porcentajeDeProgreso: number;
    fechaCreacion: Date;
    Estado: string;
    Total: number;
}