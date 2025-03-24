import { Cliente } from './cliente-cl';
import { Servicio } from './servicio';

export class TestimonioCL {
  idTestimonio: number;
  texto: string;
  imagen: string;
  calificacion: number;
  fecha: Date;
  cliente: Cliente;
  servicio: Servicio;

  constructor(
    idTestimonio: number = 0,
    texto: string = '',
    imagen: string = '',
    calificacion: number = 0,
    fecha: Date = new Date(),
    cliente: Cliente = new Cliente(),
    servicio: Servicio = new Servicio()
  ) {
    this.idTestimonio = idTestimonio;
    this.texto = texto;
    this.imagen = imagen;
    this.calificacion = calificacion;
    this.fecha = fecha;
    this.cliente = cliente;
    this.servicio = servicio;
  }
}
