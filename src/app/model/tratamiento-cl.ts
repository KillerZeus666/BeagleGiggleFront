import { VeterinarioCL } from "./veterinario-cl";
import { MascotaCL } from "./mascota-cl";
import { ServicioCL } from "./servicio-cl";


export class TratamientoCL {
    public idTratamiento: number;
    public codigo: string;
    public fecha: Date;
    public detalles: string;
    public veterinario?: VeterinarioCL;
    public mascota?: MascotaCL;
    public servicio?: ServicioCL;

    constructor();
    constructor(
        idTratamiento: number,
        codigo: string,
        fecha: Date,
        detalles: string,
        veterinario: VeterinarioCL,
        mascota: MascotaCL,
        servicio: ServicioCL
    );
    constructor(
        idTratamiento?: number,
        codigo?: string,
        fecha?: Date,
        detalles?: string,
        veterinario?: VeterinarioCL,
        mascota?: MascotaCL,
        servicio?: ServicioCL
    ) {
        this.idTratamiento = idTratamiento || 0;
        this.codigo = codigo || "";
        this.fecha = fecha || new Date();
        this.detalles = detalles || "";
        this.veterinario = veterinario;
        this.mascota = mascota;
        this.servicio = servicio;
    }
}
