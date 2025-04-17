import { SelfDecorator } from '@angular/core';
import { CitaCL } from './cita-cl';
import { TratamientoCL } from './tratamiento-cl';

export class VeterinarioCL {
  idVeterinario: number;
  nombre: string;
  cedula: string;
  especialidad: string;
  foto: string;
  estado: number;
  sede: string;
  numeroAtenciones: number;
  nombreUsuario: string;
  contrasena: string;
  citas: CitaCL[];
  tratamientos: TratamientoCL[];

  constructor(
    idVeterinario: number = 0,
    nombre: string = '',
    cedula: string = '',
    especialidad: string = '',
    foto: string = '',
    estado: number = 1,
    sede: string = '',
    numeroAtenciones: number = 0,
    nombreUsuario: string = '',
    contrasena: string = '',
    citas: CitaCL[] = [],
    tratamientos: TratamientoCL[] = []
  ) {
    this.idVeterinario = idVeterinario;
    this.nombre = nombre;
    this.cedula = cedula;
    this.especialidad = especialidad;
    this.foto = foto;
    this.estado = estado;
    this.sede = sede;
    this.numeroAtenciones = numeroAtenciones;
    this.nombreUsuario = nombreUsuario;
    this.contrasena = contrasena;
    this.citas = citas;
    this.tratamientos = tratamientos;
  }

  public static fromBackendData(data: any): VeterinarioCL {
    return new VeterinarioCL(
      data.idVeterinario,
      data.nombre,
      data.cedula,
      data.especialidad,
      data.foto,
      data.estado,
      data.sede,
      data.numeroAtenciones,
      data.nombreUsuario,
      data.contrasena,
      data.citas
        ? data.citas.map((cita: any) => CitaCL.fromBackendData(cita))
        : [],
      data.tratamientos
        ? data.tratamientos.map((tratamiento: any) =>
            TratamientoCL.fromBackendData(tratamiento)
          )
        : []
    );
  }

  public toBackendFormat(): any {
    return {
      idVeterinario: this.idVeterinario,
      nombre: this.nombre,
      cedula: this.cedula,
      especialidad: this.especialidad,
      foto: this.foto,
      estado: this.estado,
      sede: this.sede,
      numeroAtenciones: this.numeroAtenciones,
      nombreUsuario: this.nombreUsuario,
      contrasena: this.contrasena,
      citas: this.citas.map((cita) => cita.toBackendFormat()),
      tratamientos: this.tratamientos.map((tratamiento) =>
        tratamiento.toBackendFormat()
      ),
    };
  }
}