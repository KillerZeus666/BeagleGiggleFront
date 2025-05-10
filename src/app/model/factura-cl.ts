import { ClienteCL } from './cliente-cl';
import { TratamientoCL } from './tratamiento-cl';
import { ServicioCL } from './servicio-cl';
import { FacturaMedicamentoCL } from './factura-medicamento-cl';

export class FacturaCL {
  public idFactura: number;
  public fechaHora: Date;
  public total: number;
  public pagada: boolean;
  public metododepago: string;
  public cliente: ClienteCL;
  public tratamiento?: TratamientoCL | null;
  public servicio?: ServicioCL | null;
  public facturaMedicamentos: FacturaMedicamentoCL[];

  constructor(
    idFactura: number = 0,
    fechaHora: Date = new Date(),
    total: number = 0.0,
    pagada: boolean = false,
    metododepago: string = '',
    cliente: ClienteCL,
    tratamiento: TratamientoCL | null = null,
    servicio: ServicioCL | null = null,
    facturaMedicamentos: FacturaMedicamentoCL[] = []
  ) {
    this.idFactura = idFactura;
    this.fechaHora = fechaHora;
    this.total = total;
    this.pagada = pagada;
    this.metododepago = metododepago;
    this.cliente = cliente;
    this.tratamiento = tratamiento;
    this.servicio = servicio;
    this.facturaMedicamentos = facturaMedicamentos;
  }

  public static fromBackendData(data: any): FacturaCL {
    return new FacturaCL(
      data.idFactura,
      new Date(data.fechaHora),
      data.total,
      data.pagada,
      data.metododepago,
      ClienteCL.fromBackendData(data.cliente),
      data.tratamiento ? TratamientoCL.fromBackendData(data.tratamiento) : null,
      data.servicio ? ServicioCL.fromBackendData(data.servicio) : null,
      data.facturaMedicamentos
        ? data.facturaMedicamentos.map((fm: any) => FacturaMedicamentoCL.fromBackendData(fm))
        : []
    );
  }

  public toBackendFormat(): any {
    return {
      idFactura: this.idFactura,
      fechaHora: this.fechaHora.toISOString(),
      total: this.total,
      pagada: this.pagada,
      metododepago: this.metododepago,
      cliente: this.cliente.toBackendFormat(),
      tratamiento: this.tratamiento ? this.tratamiento.toBackendFormat() : null,
      servicio: this.servicio ? this.servicio.toBackendFormat() : null,
      facturaMedicamentos: this.facturaMedicamentos.map((fm) => fm.toBackendFormat())
    };
  }

  public validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.fechaHora) {
      errors.push('La fecha y hora son requeridas');
    }

    if (this.total == null || isNaN(this.total) || this.total < 0) {
      errors.push('El total debe ser un número válido y positivo');
    }

    if (!this.metododepago || this.metododepago.trim() === '') {
      errors.push('El método de pago es requerido');
    }

    if (!this.cliente) {
      errors.push('El cliente es requerido');
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }
}
