export class AdministradorCL {
  idAdministrador: number;
  nombre: string;
  correo: string;
  foto: string;
  cedula: string;
  nombreUsuario: string;
  contrasenha: string;

  constructor(
    idAdministrador: number = 0,
    nombre: string = '',
    correo: string = '',
    foto: string = '',
    cedula: string = '',
    nombreUsuario: string = '',
    contrasenha: string = ''
  ) {
    this.idAdministrador = idAdministrador;
    this.nombre = nombre;
    this.correo = correo;
    this.foto = foto;
    this.cedula = cedula;
    this.nombreUsuario = nombreUsuario;
    this.contrasenha = contrasenha;
  }

  static fromBackendData(data: any): AdministradorCL {
    return new AdministradorCL(
      data.idAdministrador,
      data.nombre,
      data.correo,
      data.foto,
      data.cedula,
      data.nombreUsuario,
      data.contrasenha
    );
  }

  toBackendFormat(): any {
    return {
      idAdministrador: this.idAdministrador,
      nombre: this.nombre,
      correo: this.correo,
      foto: this.foto,
      cedula: this.cedula,
      nombreUsuario: this.nombreUsuario,
      contrasenha: this.contrasenha,
    };
  }
}