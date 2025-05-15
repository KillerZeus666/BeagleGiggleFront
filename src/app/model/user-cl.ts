export class UserCl {
    public nombreUsuario: string;
    public contrasena: string;

    constructor (
        nombreUsuario: string = '',
        contrasena: string = '',
    ){
        this.nombreUsuario = nombreUsuario
        this.contrasena = contrasena
    }
}
