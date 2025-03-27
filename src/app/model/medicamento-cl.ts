import { TratamientoMedicamentoCL } from "./tratamiento-medicamento-cl";

export class MedicamentoCL {
    public idMedicamento: number;
    public nombre: string;
    public precioCompra: number;
    public precioVenta: number;
    public unidadesDisponibles: number;
    public unidadesVendidas: number;
    public tratamientoMedicamentos: TratamientoMedicamentoCL[];

    constructor();
    constructor(
        idMedicamento: number,
        nombre: string,
        precioCompra: number,
        precioVenta: number,
        unidadesDisponibles: number,
        unidadesVendidas: number,
        tratamientoMedicamentos: TratamientoMedicamentoCL[]
    );
    constructor(
        idMedicamento?: number,
        nombre?: string,
        precioCompra?: number,
        precioVenta?: number,
        unidadesDisponibles?: number,
        unidadesVendidas?: number,
        tratamientoMedicamentos?: TratamientoMedicamentoCL[]
    ) {
        this.idMedicamento = idMedicamento || 0;
        this.nombre = nombre || "";
        this.precioCompra = precioCompra || 0;
        this.precioVenta = precioVenta || 0;
        this.unidadesDisponibles = unidadesDisponibles || 0;
        this.unidadesVendidas = unidadesVendidas || 0;
        this.tratamientoMedicamentos = tratamientoMedicamentos || [];
    }
}
