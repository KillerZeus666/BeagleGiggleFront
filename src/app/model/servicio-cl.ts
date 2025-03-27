import { TestimonioCL } from './testimonio-cl';
import { TratamientoCL } from './tratamiento-cl';
import { FacturaCL } from './factura-cl';

export class ServicioCL {
  idServicio: number;
  nombre: string;
  descripcion: string;
  precioBase: number;
  testimonios: TestimonioCL[];
  tratamientos: TratamientoCL[];
  facturas: FacturaCL[];

  constructor(
    idServicio: number = 0,
    nombre: string = '',
    descripcion: string = '',
    precioBase: number = 0.0,
    testimonios: TestimonioCL[] = [],
    tratamientos: TratamientoCL[] = [],
    facturas: FacturaCL[] = []
  ) {
    this.idServicio = idServicio;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioBase = precioBase;
    this.testimonios = testimonios;
    this.tratamientos = tratamientos;
    this.facturas = facturas;
  }
}