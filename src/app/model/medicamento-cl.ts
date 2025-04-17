import { TratamientoMedicamentoCL } from './tratamiento-medicamento-cl';

export class MedicamentoCL {
  public idMedicamento: number;
  public nombre: string;
  public precioCompra: number;
  public precioVenta: number;
  public unidadesDisponibles: number;
  public unidadesVendidas: number;
  public tratamientoMedicamentos: TratamientoMedicamentoCL[];

  constructor(
    idMedicamento: number = 0,
    nombre: string = '',
    precioCompra: number = 0,
    precioVenta: number = 0,
    unidadesDisponibles: number = 0,
    unidadesVendidas: number = 0,
    tratamientoMedicamentos: TratamientoMedicamentoCL[] = []
  ) {
    this.idMedicamento = idMedicamento;
    this.nombre = nombre;
    this.precioCompra = precioCompra;
    this.precioVenta = precioVenta;
    this.unidadesDisponibles = unidadesDisponibles;
    this.unidadesVendidas = unidadesVendidas;
    this.tratamientoMedicamentos = tratamientoMedicamentos;
  }

  public static fromBackendData(data: any): MedicamentoCL {
    return new MedicamentoCL(
      data.idMedicamento,
      data.nombre,
      data.precioCompra,
      data.precioVenta,
      data.unidadesDisponibles,
      data.unidadesVendidas,
      data.tratamientoMedicamentos
        ? data.tratamientoMedicamentos.map((t: any) =>
            TratamientoMedicamentoCL.fromBackendData(t)
          )
        : []
    );
  }

  public toBackendFormat(): any {
    return {
      idMedicamento: this.idMedicamento,
      nombre: this.nombre,
      precioCompra: this.precioCompra,
      precioVenta: this.precioVenta,
      unidadesDisponibles: this.unidadesDisponibles,
      unidadesVendidas: this.unidadesVendidas,
    };
  }

  public validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.nombre || this.nombre.trim() === '') {
      errors.push('El nombre es requerido');
    }

    if (this.precioCompra == null || this.precioCompra < 0) {
      errors.push('El precio de compra debe ser mayor o igual a 0');
    }

    if (this.precioVenta == null || this.precioVenta < 0) {
      errors.push('El precio de venta debe ser mayor o igual a 0');
    }

    if (this.unidadesDisponibles == null || this.unidadesDisponibles < 0) {
      errors.push('Las unidades disponibles deben ser mayores o iguales a 0');
    }

    if (this.unidadesVendidas == null || this.unidadesVendidas < 0) {
      errors.push('Las unidades vendidas deben ser mayores o iguales a 0');
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }
}