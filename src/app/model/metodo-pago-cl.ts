import { FacturaCL } from './factura-cl';

export class MetodoPagoCL {
  public id: number;
  public nombre: string;
  public facturas: FacturaCL[];

  constructor(id: number = 0, nombre: string = '', facturas: FacturaCL[] = []) {
    this.id = id;
    this.nombre = nombre;
    this.facturas = facturas;
  }

  public static fromBackendData(data: any): MetodoPagoCL {
    return new MetodoPagoCL(
      data.id,
      data.nombre,
      data.facturas
        ? data.facturas.map((f: any) => FacturaCL.fromBackendData(f))
        : []
    );
  }

  public toBackendFormat(): any {
    return {
      id: this.id,
      nombre: this.nombre,
    };
  }

  public validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.nombre || this.nombre.trim() === '') {
      errors.push('El nombre del método de pago es requerido');
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }
}