import { TratamientoCL } from './tratamiento-cl';
import { MedicamentoCL } from './medicamento-cl';

export class TratamientoMedicamentoCL {
  id: number;
  tratamiento?: TratamientoCL;
  medicamento?: MedicamentoCL;
  cantidad: number;

  constructor(
    id: number = 0,
    cantidad: number = 0,
    tratamiento?: TratamientoCL,
    medicamento?: MedicamentoCL
  ) {
    this.id = id;
    this.cantidad = cantidad;
    this.tratamiento = tratamiento;
    this.medicamento = medicamento;
  }

  public static fromBackendData(data: any): TratamientoMedicamentoCL {
    return new TratamientoMedicamentoCL(
      data.id,
      data.cantidad,
      data.tratamiento
        ? TratamientoCL.fromBackendData(data.tratamiento)
        : undefined,
      data.medicamento
        ? MedicamentoCL.fromBackendData(data.medicamento)
        : undefined
    );
  }

  public toBackendFormat(): any {
    return {
      id: this.id,
      cantidad: this.cantidad,
      idTratamiento: this.tratamiento?.idTratamiento,
      idMedicamento: this.medicamento?.idMedicamento,
    };
  }
}