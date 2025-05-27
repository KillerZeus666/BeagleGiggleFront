import { ClienteCL } from "./cliente-cl";
import { ServicioCL } from "./servicio-cl";

export class TestimonioCreateCL {
  constructor(
    public texto: string = '',
    public calificacion: number = 0,
    public fecha: Date = new Date(),
    public cliente?: ClienteCL,
    public servicio?: ServicioCL
  ) {}
}