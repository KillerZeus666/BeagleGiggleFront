import { TratamientoCL } from "./tratamiento-cl";
import { MedicamentoCL } from "./medicamento-cl";

export class TratamientoMedicamentoCL {
  id: number;
  tratamiento: TratamientoCL;
  medicamento: MedicamentoCL;
  cantidad: number;

  constructor(
    id: number = 0,
    tratamiento: TratamientoCL = new TratamientoCL(),
    medicamento: MedicamentoCL = new MedicamentoCL(),
    cantidad: number = 1
  ) {
    this.id = id;
    this.tratamiento = tratamiento;
    this.medicamento = medicamento;
    this.cantidad = cantidad;
  }
}