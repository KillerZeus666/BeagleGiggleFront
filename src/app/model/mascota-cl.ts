import { ClienteCL } from './cliente-cl';

export class MascotaCL {
  public idMascota: number;
  public nombre: string;
  public raza: string;
  public edad: number;
  public peso: number;
  public enfermedad: string;
  public foto: string;
  public fechaNacimiento?: Date;
  public fechaIngreso?: Date;
  public fechaSalida?: Date;
  public estado?: number;
  public clienteId: number;
  public cliente?: ClienteCL;

  constructor(
    idMascota: number = 0,
    nombre: string = '',
    raza: string = '',
    edad: number = 0,
    peso: number = 0,
    enfermedad: string = '',
    foto: string = '',
    fechaNacimiento?: Date,
    fechaIngreso?: Date,
    fechaSalida?: Date,
    estado?: number,
    cliente?: ClienteCL
  ) {
    this.idMascota = idMascota;
    this.nombre = nombre;
    this.raza = raza;
    this.edad = edad;
    this.peso = peso;
    this.enfermedad = enfermedad;
    this.foto = foto;
    this.fechaNacimiento = fechaNacimiento;
    this.fechaIngreso = fechaIngreso;
    this.fechaSalida = fechaSalida;
    this.estado = estado;
    this.cliente = cliente;
    this.clienteId = cliente ? cliente.idCliente : 0;
  }

  public static fromBackendData(data: any): MascotaCL {
    return new MascotaCL(
      data.idMascota,
      data.nombre,
      data.raza,
      data.edad,
      data.peso,
      data.enfermedad,
      data.foto,
      data.fechaNacimiento ? new Date(data.fechaNacimiento) : undefined,
      data.fechaIngreso ? new Date(data.fechaIngreso) : undefined,
      data.fechaSalida ? new Date(data.fechaSalida) : undefined,
      data.estado,
      data.cliente ? ClienteCL.fromBackendData(data.cliente) : undefined
    );
  }

  public toBackendFormat(): any {
    // Helper function to safely convert to ISO date string
    const toDateString = (date: any): string | null => {
      if (!date) return null;
      
      // If it's already a Date object
      if (date instanceof Date) {
        return date.toISOString().split('T')[0];
      }
      
      // If it's a string that can be converted to Date
      if (typeof date === 'string') {
        const d = new Date(date);
        if (!isNaN(d.getTime())) {
          return d.toISOString().split('T')[0];
        }
      }
      
      return null;
    };
  
    return {
      idMascota: this.idMascota,
      nombre: this.nombre,
      raza: this.raza,
      edad: this.edad,
      peso: this.peso,
      enfermedad: this.enfermedad,
      foto: this.foto,
      fechaNacimiento: toDateString(this.fechaNacimiento),
      fechaIngreso: toDateString(this.fechaIngreso),
      fechaSalida: toDateString(this.fechaSalida),
      estado: this.estado,
      cliente: this.cliente ? this.cliente.toBackendFormat() : null,
    };
  }

  public validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.nombre || this.nombre.trim() === '') {
      errors.push('El nombre de la mascota es requerido');
    }

    if (!this.raza || this.raza.trim() === '') {
      errors.push('La raza es requerida');
    }

    if (!this.foto || this.foto.trim() === '') {
      errors.push('La foto es requerida');
    }

    if (!this.clienteId || this.clienteId <= 0) {
      errors.push('Debe asignarse un cliente válido');
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }
}