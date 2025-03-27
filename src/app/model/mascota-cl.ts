import { ClienteCL } from "./cliente-cl";

export class MascotaCL {
    public idMascota: number;
    public nombre: string;
    public raza: string;
    public edad: number;
    public peso: number;
    public enfermedad: string;
    public foto: string;
    public fechaNacimiento?: Date;
    public fechaIngreso?: Date;
    public fechaSalida?: Date;
    public estado?: number;
    public clienteId: number;

    constructor();
    constructor(
        idMascota: number,
        nombre: string,
        raza: string,
        edad: number,
        peso: number,
        enfermedad: string,
        foto: string,
        fechaNacimiento: Date,
        fechaIngreso: Date,
        fechaSalida: Date,
        estado: number,
        cliente: ClienteCL
    );
    constructor(
        idMascota?: number,
        nombre?: string,
        raza?: string,
        edad?: number,
        peso?: number,
        enfermedad?: string,
        foto?: string,
        fechaNacimiento?: Date,
        fechaIngreso?: Date,
        fechaSalida?: Date,
        estado?: number,
        cliente?: ClienteCL
    ) {
        this.idMascota = idMascota || 0;
        this.nombre = nombre || "";
        this.raza = raza || "";
        this.edad = edad || 0;
        this.peso = peso || 0;
        this.enfermedad = enfermedad || "";
        this.foto = foto || "";
        this.fechaNacimiento = fechaNacimiento;
        this.fechaIngreso = fechaIngreso;
        this.fechaSalida = fechaSalida;
        this.estado = estado;
        this.clienteId = cliente ? cliente.idCliente : 0;
    }
}