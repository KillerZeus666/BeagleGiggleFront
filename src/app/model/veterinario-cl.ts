import { CitaCL } from "./cita-cl";
import { TratamientoCL } from "./tratamiento-cl";

export class VeterinarioCL {
  idVeterinario: number;
  nombre: string;
  cedula: string;
  especialidad: string;
  foto: string;
  estado: number;
  numeroAtenciones: number;
  nombreUsuario: string;
  contrasena: string;
  citas: CitaCL[];
  tratamientos: TratamientoCL[];

  constructor(
    idVeterinario: number = 0,
    nombre: string = "",
    cedula: string = "",
    especialidad: string = "",
    foto: string = "",
    estado: number = 1,
    numeroAtenciones: number = 0,
    nombreUsuario: string = "",
    contrasena: string = "",
    citas: CitaCL[] = [],
    tratamientos: TratamientoCL[] = []
  ) {
    this.idVeterinario = idVeterinario;
    this.nombre = nombre;
    this.cedula = cedula;
    this.especialidad = especialidad;
    this.foto = foto;
    this.estado = estado;
    this.numeroAtenciones = numeroAtenciones;
    this.nombreUsuario = nombreUsuario;
    this.contrasena = contrasena;
    this.citas = citas;
    this.tratamientos = tratamientos;
  }
}