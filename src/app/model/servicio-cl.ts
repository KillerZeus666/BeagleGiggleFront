import { TestimonioCL } from './testimonio-cl';
import { TratamientoCL } from './tratamiento-cl';
import { FacturaCL } from './factura-cl';

export class ServicioCL {
  public idServicio: number;
  public nombre: string;
  public descripcion: string;
  public precioBase: number;
  public imagenFrontal: string;
  public imagenTrasera: string;
  public testimonios: TestimonioCL[];
  public tratamientos: TratamientoCL[];
  public facturas: FacturaCL[];

  constructor(
    idServicio: number = 0,
    nombre: string = '',
    descripcion: string = '',
    precioBase: number = 0.0,
    imagenFrontal: string = '',
    imagenTrasera: string = '',
    testimonios: TestimonioCL[] = [],
    tratamientos: TratamientoCL[] = [],
    facturas: FacturaCL[] = []
  ) {
    this.idServicio = idServicio;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioBase = precioBase;
    this.imagenFrontal = imagenFrontal;
    this.imagenTrasera = imagenTrasera;
    this.testimonios = testimonios;
    this.tratamientos = tratamientos;
    this.facturas = facturas;
  }

  public static fromBackendData(data: any): ServicioCL {
    return new ServicioCL(
      data.idServicio,
      data.nombre,
      data.descripcion,
      data.precioBase,
      data.imagenFrontal,
      data.imagenTrasera,
      data.testimonios
        ? data.testimonios.map((t: any) => TestimonioCL.fromBackendData(t))
        : [],
      data.tratamientos
        ? data.tratamientos.map((tr: any) => TratamientoCL.fromBackendData(tr))
        : [],
      data.facturas
        ? data.facturas.map((f: any) => FacturaCL.fromBackendData(f))
        : []
    );
  }

  public toBackendFormat(): any {
    return {
      idServicio: this.idServicio,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precioBase: this.precioBase,
      imagenFrontal: this.imagenFrontal,
      imagenTrasera: this.imagenTrasera,
    };
  }

  public validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.nombre || this.nombre.trim() === '') {
      errors.push('El nombre del servicio es requerido');
    }

    if (!this.descripcion || this.descripcion.trim() === '') {
      errors.push('La descripción es requerida');
    }

    if (this.precioBase < 0) {
      errors.push('El precio base debe ser mayor o igual a 0');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
}