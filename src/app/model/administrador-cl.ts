export class AdministradorCL {
    idAdministrador: number;
    nombre: string;
    correo: string;
    foto: string;
    cedula: string;
    nombreUsuario: string;
    contrasena: string;
  
    constructor(
      idAdministrador: number = 0,
      nombre: string = "",
      correo: string = "",
      foto: string = "",
      cedula: string = "",
      nombreUsuario: string = "",
      contrasena: string = ""
    ) {
      this.idAdministrador = idAdministrador;
      this.nombre = nombre;
      this.correo = correo;
      this.foto = foto;
      this.cedula = cedula;
      this.nombreUsuario = nombreUsuario;
      this.contrasena = contrasena;
    }
  }