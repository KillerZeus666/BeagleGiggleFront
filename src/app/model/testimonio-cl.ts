import { ClienteCL } from './cliente-cl';
import { ServicioCL } from './servicio-cl';

export class TestimonioCL {
  public idTestimonio: number;
  public texto: string;
  public calificacion: number;
  public fecha: Date;
  public cliente: ClienteCL;
  public servicio: ServicioCL;

  constructor(
    idTestimonio: number = 0,
    texto: string = '',
    calificacion: number = 0,
    fecha: Date = new Date(),
    cliente: ClienteCL = new ClienteCL(),
    servicio: ServicioCL = new ServicioCL()
  ) {
    this.idTestimonio = idTestimonio;
    this.texto = texto;
    this.calificacion = calificacion;
    this.fecha = fecha;
    this.cliente = cliente;
    this.servicio = servicio;
  }

  public static fromBackendData(data: any): TestimonioCL {
    return new TestimonioCL(
      data.idTestimonio,
      data.texto,
      data.calificacion,
      new Date(data.fecha),
      ClienteCL.fromBackendData(data.cliente),
      ServicioCL.fromBackendData(data.servicio)
    );
  }

  public toBackendFormat(): any {
    return {
      idTestimonio: this.idTestimonio,
      texto: this.texto,
      calificacion: this.calificacion,
      fecha: this.fecha.toISOString().split('T')[0],
      cliente: this.cliente.idCliente,
      servicio: this.servicio.idServicio,
    };
  }
}