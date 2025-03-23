export interface Mascota {
    idMascota: number;
    nombre: string;
    raza: string;
    edad: number;
    peso: number;
    enfermedad: string;
    foto: string;
    fechaNacimiento?: Date;
    fechaIngreso?: Date;
    fechaSalida?: Date;
    estado?: number;
    clienteId: number;
}
