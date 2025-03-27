import { ClienteCL } from './cliente-cl';
import { ServicioCL } from './servicio-cl';

export class TestimonioCL {
  idTestimonio: number;
  texto: string;
  imagen: string;
  calificacion: number;
  fecha: Date;
  cliente: ClienteCL;
  servicio: ServicioCL;

  constructor(
    idTestimonio: number = 0,
    texto: string = '',
    imagen: string = '',
    calificacion: number = 0,
    fecha: Date = new Date(),
    cliente: ClienteCL = new ClienteCL(),
    servicio: ServicioCL = new ServicioCL()
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
