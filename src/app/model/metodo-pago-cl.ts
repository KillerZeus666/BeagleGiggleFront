import { FacturaCL } from "./factura-cl";

export class MetodoPagoCL {
  id: number;
  nombre: string;
  facturas: FacturaCL[];

  constructor(id: number = 0, nombre: string = "", facturas: FacturaCL[] = []) {
    this.id = id;
    this.nombre = nombre;
    this.facturas = facturas;
  }
}