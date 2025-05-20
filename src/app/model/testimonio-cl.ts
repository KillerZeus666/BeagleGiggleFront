export class TestimonioCL {
  public idTestimonio: number;
  public texto: string;
  public calificacion: number;
  public fecha: Date;
  public cliente: string;
  public servicio: string;
  public imagenCliente: string;

  constructor(
    idTestimonio: number = 0,
    texto: string = '',
    calificacion: number = 0,
    fecha: Date = new Date(),
    cliente: string = '',
    servicio: string = '',
    imagenCliente: string = ''
  ) {
    this.idTestimonio = idTestimonio;
    this.texto = texto;
    this.calificacion = calificacion;
    this.fecha = fecha;
    this.cliente = cliente;
    this.servicio = servicio;
    this.imagenCliente = imagenCliente;
  }

  public static fromBackendData(data: any): TestimonioCL {
    return new TestimonioCL(
      data.idTestimonio,
      data.texto,
      data.calificacion,
      new Date(data.fecha),
      data.cliente,
      data.servicio,
      data.imagenCliente
    );
  }
}