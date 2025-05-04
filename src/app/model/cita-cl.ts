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
  estado: string;

  constructor(
    idCita: number = 0,
    fechaHora: Date = new Date(),
    sede: string = '',
    mascota: MascotaCL = new MascotaCL(),
    veterinario: VeterinarioCL = new VeterinarioCL(),
    servicio: ServicioCL = new ServicioCL(),
    estado: string = 'AGENDADA' // Valor por defecto
  ) {
    this.idCita = idCita;
    this.fechaHora = fechaHora;
    this.sede = sede;
    this.mascota = mascota;
    this.veterinario = veterinario;
    this.servicio = servicio;
    this.estado = estado;
  }

  static fromBackendData(data: any): CitaCL {
    return new CitaCL(
      data.idCita,
      new Date(data.fechaHora),
      data.sede,
      MascotaCL.fromBackendData(data.mascota),
      VeterinarioCL.fromBackendData(data.veterinario) ,
      ServicioCL.fromBackendData(data.servicio),
      data.estado || 'AGENDADA' // Manejo por defecto si no viene el estado
    );
  }

  toBackendFormat(): any {
    let fechaHoraDate: Date;
    if (this.fechaHora instanceof Date) {
      fechaHoraDate = this.fechaHora;
    } else if (typeof this.fechaHora === 'string') {
      fechaHoraDate = new Date(this.fechaHora);
    } else {
      fechaHoraDate = new Date(); // fallback to current date
    }
    if (!this.veterinario || !this.servicio || !this.mascota) {
      throw new Error('Missing required properties for cita');
    }
    return {
      idCita: this.idCita,
      fechaHora: this.fechaHora?.toISOString(),
      sede: this.sede,
      mascota: { idMascota: this.mascota.idMascota },
      veterinario: { idVeterinario: this.veterinario.idVeterinario },
      servicio: { idServicio: this.servicio.idServicio },
      estado: this.estado
    };
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Convert fechaHora to Date if it isn't already
    let fechaHoraDate: Date;
    try {
      fechaHoraDate = this.fechaHora instanceof Date 
        ? this.fechaHora 
        : new Date(this.fechaHora);
    } catch (e) {
      errors.push('Fecha inválida');
      return { isValid: false, errors };
    }
  
    if (!this.sede?.trim()) {
      errors.push('La sede es requerida');
    }
  
    if (!this.mascota?.idMascota) {
      errors.push('Debe seleccionar una mascota');
    }
  
    if (!fechaHoraDate || isNaN(fechaHoraDate.getTime())) {
      errors.push('Fecha inválida');
    } else if (fechaHoraDate <= new Date()) {
      errors.push('La fecha debe ser futura');
    }
  
    if (!this.estado?.trim()) {
      errors.push('El estado es requerido');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}