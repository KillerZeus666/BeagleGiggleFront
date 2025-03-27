import { MascotaCL } from "./mascota-cl";
import { VeterinarioCL } from "./veterinario-cl";
import { ServicioCL } from "./servicio-cl";

export class CitaCL {
  idCita: number;
  fechaHora: Date;
  sede: string;
  mascota: MascotaCL;
  veterinario: VeterinarioCL | null;
  servicio: ServicioCL | null;

  constructor(
    idCita: number = 0,
    fechaHora: Date = new Date(),
    sede: string = "",
    mascota: MascotaCL = new MascotaCL(),
    veterinario: VeterinarioCL | null = null,
    servicio: ServicioCL | null = null
  ) {
    this.idCita = idCita;
    this.fechaHora = fechaHora;
    this.sede = sede;
    this.mascota = mascota;
    this.veterinario = veterinario;
    this.servicio = servicio;
  }
}