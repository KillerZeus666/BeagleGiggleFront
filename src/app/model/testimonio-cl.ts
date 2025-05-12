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
    const testimonio = new TestimonioCL();
    testimonio.idTestimonio = data.idTestimonio;
    testimonio.texto = data.texto;
    testimonio.calificacion = data.calificacion;
    testimonio.fecha = new Date(data.fecha);
    
    testimonio.cliente = new ClienteCL();
    testimonio.cliente.nombre = data.nombreCliente || '';
    testimonio.cliente.foto = data.imagenCliente || '';
    
    testimonio.servicio = new ServicioCL();
    testimonio.servicio.nombre = data.nombreServicio || '';
    
    return testimonio;
  }

  public toBackendFormat(): any {
    return {
      idTestimonio: this.idTestimonio,
      texto: this.texto,
      calificacion: this.calificacion,
      fecha: this.fecha.toISOString().split('T')[0],
      cliente: {
        nombre: this.cliente.nombre,
        foto: this.cliente.foto
      },
      servicio: {
        nombre: this.servicio.nombre
      }
    };
  }
}