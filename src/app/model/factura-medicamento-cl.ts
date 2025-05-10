import { FacturaCL } from './factura-cl';
import { MedicamentoCL } from './medicamento-cl';

export class FacturaMedicamentoCL {
  public id: number;
  public factura?: FacturaCL | null;
  public medicamento?: MedicamentoCL | null;

  constructor(
    id: number = 0,
    factura: FacturaCL | null = null,
    medicamento: MedicamentoCL | null = null
  ) {
    this.id = id;
    this.factura = factura;
    this.medicamento = medicamento;
  }

  public static fromBackendData(data: any): FacturaMedicamentoCL {
    return new FacturaMedicamentoCL(
      data.id,
      data.factura ? FacturaCL.fromBackendData(data.factura) : null,
      data.medicamento ? MedicamentoCL.fromBackendData(data.medicamento) : null
    );
  }

  public toBackendFormat(): any {
    return {
      id: this.id,
      factura: this.factura ? this.factura.toBackendFormat() : null,
      medicamento: this.medicamento ? this.medicamento.toBackendFormat() : null
    };
  }

  public validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.factura) {
      errors.push('La factura es requerida');
    }

    if (!this.medicamento) {
      errors.push('El medicamento es requerido');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
