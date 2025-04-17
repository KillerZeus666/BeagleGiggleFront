import { MascotaCL } from './mascota-cl';
import { TestimonioCL } from './testimonio-cl';

export class ClienteCL {
  public idCliente: number;
  public nombre: string;
  public correo: string;
  public celular: string;
  public foto: string;
  public cedula: string;
  public nombreUsuario: string;
  public contrasenha: string;
  public mascotas: MascotaCL[];
  public testimonios: TestimonioCL[];

  constructor(
    idCliente: number = 0,
    nombre: string = '',
    correo: string = '',
    celular: string = '',
    foto: string = '',
    cedula: string = '',
    nombreUsuario: string = '',
    contrasenha: string = '',
    mascotas: MascotaCL[] = [],
    testimonios: TestimonioCL[] = []
  ) {
    this.idCliente = idCliente;
    this.nombre = nombre;
    this.correo = correo;
    this.celular = celular;
    this.foto = foto;
    this.cedula = cedula;
    this.nombreUsuario = nombreUsuario;
    this.contrasenha = contrasenha;
    this.mascotas = mascotas;
    this.testimonios = testimonios;
  }

  // Método para crear desde datos del backend
  public static fromBackendData(data: any): ClienteCL {
    return new ClienteCL(
      data.idCliente,
      data.nombre,
      data.correo,
      data.celular,
      data.foto,
      data.cedula,
      data.nombreUsuario,
      data.contrasenha,
      data.mascotas
        ? data.mascotas.map((m: any) => MascotaCL.fromBackendData(m))
        : [],
      data.testimonios
        ? data.testimonios.map((t: any) => TestimonioCL.fromBackendData(t))
        : []
    );
  }

  // Método para convertir a formato de backend
  public toBackendFormat(): any {
    return {
      idCliente: this.idCliente,
      nombre: this.nombre,
      correo: this.correo,
      celular: this.celular,
      foto: this.foto,
      cedula: this.cedula,
      nombreUsuario: this.nombreUsuario,
      contrasenha: this.contrasenha,
    };
  }

  // Validación básica
  public validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.nombre || this.nombre.trim() === '') {
      errors.push('El nombre es requerido');
    }

    if (!this.correo || !this.correo.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push('Correo electrónico inválido');
    }

    if (!this.celular || this.celular.trim() === '') {
      errors.push('El celular es requerido');
    }

    if (!this.cedula || this.cedula.trim() === '') {
      errors.push('La cédula es requerida');
    }

    if (!this.nombreUsuario || this.nombreUsuario.trim() === '') {
      errors.push('El nombre de usuario es requerido');
    }

    if (!this.contrasenha || this.contrasenha.length < 8) {
      errors.push('La contraseña debe tener al menos 8 caracteres');
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }
}