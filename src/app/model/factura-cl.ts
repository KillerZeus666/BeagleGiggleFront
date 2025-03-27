import { MetodoPagoCL } from "./metodo-pago-cl";
import { ServicioCL } from "./servicio-cl";

export class FacturaCL {
  idFactura: number;
  fecha: Date;
  total: number;
  metodosPago: MetodoPagoCL[];
  servicios: ServicioCL[];

  constructor(
    idFactura: number = 0,
    fecha: Date = new Date(),
    total: number = 0.0,
    metodosPago: MetodoPagoCL[] = [],
    servicios: ServicioCL[] = []
  ) {
    this.idFactura = idFactura;
    this.fecha = fecha;
    this.total = total;
    this.metodosPago = metodosPago;
    this.servicios = servicios;
  }
}