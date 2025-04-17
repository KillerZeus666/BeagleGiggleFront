import { MetodoPagoCL } from './metodo-pago-cl';
import { ServicioCL } from './servicio-cl';

export class FacturaCL {
  public idFactura: number;
  public fecha: Date;
  public total: number;
  public metodosPago: MetodoPagoCL[];
  public servicios: ServicioCL[];

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

  public static fromBackendData(data: any): FacturaCL {
    return new FacturaCL(
      data.idFactura,
      new Date(data.fecha),
      data.total,
      data.metodosPago
        ? data.metodosPago.map((m: any) => MetodoPagoCL.fromBackendData(m))
        : [],
      data.servicios
        ? data.servicios.map((s: any) => ServicioCL.fromBackendData(s))
        : []
    );
  }

  public toBackendFormat(): any {
    return {
      idFactura: this.idFactura,
      fecha: this.fecha.toISOString(),
      total: this.total,
      metodosPago: this.metodosPago.map((m) => m.toBackendFormat()),
      servicios: this.servicios.map((s) => s.toBackendFormat()),
    };
  }

  public validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.fecha) {
      errors.push('La fecha es requerida');
    }

    if (this.total == null || isNaN(this.total) || this.total < 0) {
      errors.push('El total debe ser un número válido y positivo');
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }
}