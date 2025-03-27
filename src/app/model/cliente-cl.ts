import { MascotaCL } from "./mascota-cl";
import { TestimonioCL } from "./testimonio-cl";

export class ClienteCL {
    public idCliente: number;
    public nombre: string;
    public correo: string;
    public celular: string;
    public foto: string;
    public cedula: string;
    public nombreUsuario: string;
    public contrasena: string;
    public mascotas: MascotaCL[];
    public testimonios: TestimonioCL[];

    constructor();
    constructor(
        idCliente: number,
        nombre: string,
        correo: string,
        celular: string,
        foto: string,
        cedula: string,
        nombreUsuario: string,
        contrasena: string,
        mascotas: MascotaCL[],
        testimonios: TestimonioCL[]
    );
    constructor(
        idCliente?: number,
        nombre?: string,
        correo?: string,
        celular?: string,
        foto?: string,
        cedula?: string,
        nombreUsuario?: string,
        contrasena?: string,
        mascotas?: MascotaCL[],
        testimonios?: TestimonioCL[]
    ) {
        this.idCliente = idCliente || 0;
        this.nombre = nombre || "";
        this.correo = correo || "";
        this.celular = celular || "";
        this.foto = foto || "";
        this.cedula = cedula || "";
        this.nombreUsuario = nombreUsuario || "";
        this.contrasena = contrasena || "";
        this.mascotas = mascotas || [];
        this.testimonios = testimonios || [];
    }
}
