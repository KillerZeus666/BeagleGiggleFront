import { MascotaCL } from './mascota-cl';
import { VeterinarioCL } from './veterinario-cl';
import { ServicioCL } from './servicio-cl';

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
    sede: string = '',
    mascota: MascotaCL = new MascotaCL(),
    veterinario: VeterinarioCL | null = null,
    servicio: ServicioCL | null = null
    
  ) {
    this.idCita = idCita;
    this.fechaHora = fechaHora;
    this.sede = sede;
    this.mascota = mascota;
    this.veterinario = veterinario;
    this.servicio = servicio;
  }

  static fromBackendData(data: any): CitaCL {
    return new CitaCL(
      data.idCita,
      new Date(data.fechaHora),
      data.sede,
      MascotaCL.fromBackendData(data.mascota),
      data.veterinario ? VeterinarioCL.fromBackendData(data.veterinario) : null,
      data.servicio ? ServicioCL.fromBackendData(data.servicio) : null
    );
  }

  toBackendFormat(): any {
    return {
      idCita: this.idCita,
      fechaHora: this.fechaHora.toISOString(),
      sede: this.sede,
      mascota: { idMascota: this.mascota.idMascota },
      veterinario: this.veterinario
        ? { idVeterinario: this.veterinario.idVeterinario }
        : null,
      servicio: this.servicio ? { idServicio: this.servicio.idServicio } : null,
    };
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.sede || this.sede.trim() === '') {
      errors.push('La sede es requerida');
    }

    if (!this.mascota || !this.mascota.idMascota) {
      errors.push('Debe seleccionar una mascota');
    }

    if (!this.fechaHora || this.fechaHora <= new Date()) {
      errors.push('La fecha debe ser futura');
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }
}