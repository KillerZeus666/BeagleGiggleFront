export class MascotaCL {
    public idMascota: number;
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
        clienteId: number
    ) {
        this.idMascota = idMascota
        this.nombre = nombre
        this.raza = raza
        this.edad = edad
        this.peso = peso
        this.enfermedad = enfermedad
        this.foto = foto
        this.fechaNacimiento = fechaNacimiento
        this.fechaIngreso = fechaIngreso
        this.fechaSalida = fechaSalida
        this.estado = estado
        this.clienteId = clienteId
    } public nombre: string;
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
}
