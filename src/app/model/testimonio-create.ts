export class TestimonioCreateCL {
  constructor(
    public texto: string = '',
    public calificacion: number = 0,
    public fecha: Date = new Date(),
    public idCliente: number = 0,
    public idServicio: number = 0
  ) {}
}