import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ClienteCL } from '../model/cliente-cl';
import { ClienteService } from '../service/cliente.service';
import { UserCl } from '../model/user-cl';
import { AdminService } from '../service/admin.service';
import { VeterinarioService } from '../service/veterinario.service';
import { VeterinarioCL } from '../model/veterinario-cl';
import { AdministradorCL } from '../model/administrador-cl';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';
  userType = ''; 
  cliente!: ClienteCL;
  veterinario!: VeterinarioCL;
  admin!: AdministradorCL;
  usuario!:UserCl
  constructor(
    private router: Router,
    private authService: AuthService,
    private clienteService: ClienteService,
    private adminService:AdminService,
    private veterinarioService:VeterinarioService
  ) {}

  ngOnInit(): void {
    // Datos de prueba
    this.username = 'carlosg';
    this.password = 'pass2';
  }

  onSubmit() {
    this.errorMessage = ''; 
    if (this.userType === 'cliente') {
      this.loginCliente();
    } else if (this.userType === 'admin') {
      this.loginAdmin();
    } else if (this.userType === 'veterinario') {
      this.loginVeterinario();
    }
  }

  private loginCliente() {
  this.usuario = {
    nombreUsuario: this.username,
    contrasena: this.password
  };

  this.clienteService.login(this.usuario).subscribe({
    next: (response) => {
      try {
        localStorage.setItem('token', String(response));

        this.clienteService.clienteHome().subscribe({
          next: (data) => {
            this.cliente = data;
            if (this.cliente) {
              this.authService.login({
                id: this.cliente.idCliente,
                tipo: 'Cliente',
                nombre: this.cliente.nombre,
                foto: this.cliente.foto
              });

              this.router.navigate(['/mascotas-cliente', this.authService.getUserId()]);
            } else {
              this.errorMessage = 'Credenciales de cliente incorrectas';
            }
          },
          error: (e) => {
            console.error('Error al obtener datos del cliente:', e);
            this.errorMessage = 'No se pudieron obtener los datos del cliente';
          }
        });

      } catch (e) {
        this.errorMessage = 'Error al procesar la respuesta del servidor';
        console.error('Error procesando la respuesta del login:', e);
      }
    },
    error: (err) => {
      console.error('Error de inicio de sesión:', err);
      this.errorMessage = err.status === 401
        ? 'Credenciales incorrectas'
        : 'Error al conectar con el servidor';
    }
  });
}


  private loginAdmin() {
    this.usuario = {
    nombreUsuario: this.username,
    contrasena: this.password
  };

  this.adminService.login(this.usuario).subscribe({
    next: (response) =>{
      try{
        localStorage.setItem('token', String(response));

        this.adminService.AdminHome().subscribe({
          next:(data) => {
            this.admin = data;
            if(this.admin){
              this.authService.login({
                id:this.admin.idAdministrador,
                tipo: 'Admin',
                nombre: this.admin.nombre,
                foto: this.admin.foto
              });

              this.router.navigate(['/admin']);
            }
          },
          error: (e) => {
            console.error('Error al obtener datos del admin:', e);
            this.errorMessage = 'No se pudieron obtener los datos del admin';
          }
        })
      }catch(e){
        this.errorMessage = 'Error al procesar la respuesta del servidor';
        console.error('Error procesando la respuesta del login:', e);
      }
    },
    error: (err) => {
      console.error('Error de inicio de sesión:', err);
      this.errorMessage = err.status === 401
        ? 'Credenciales incorrectas'
        : 'Error al conectar con el servidor';
    }
  });
  
  }

  private loginVeterinario() {
    this.usuario = {
    nombreUsuario: this.username,
    contrasena: this.password
  };

  this.veterinarioService.login(this.usuario).subscribe({
    next: (response) => {
      try {
        localStorage.setItem('token', String(response));

        this.veterinarioService.veterinarioHome().subscribe({
          next: (data) => {
            this.veterinario = data;
            if (this.veterinario) {
              this.authService.login({
                id: this.veterinario.idVeterinario,
                tipo: 'Veterinario',
                nombre: this.veterinario.nombre,
                foto: this.veterinario.foto
              });

              this.router.navigate(['/detalles-veterinario', this.authService.getUserId()]);
            } else {
              this.errorMessage = 'Credenciales de cliente incorrectas';
            }
          },
          error: (e) => {
            console.error('Error al obtener datos del veterinario:', e);
            this.errorMessage = 'No se pudieron obtener los datos del veterinario';
          }
        });

      } catch (e) {
        this.errorMessage = 'Error al procesar la respuesta del servidor';
        console.error('Error procesando la respuesta del login:', e);
      }
    },
    error: (err) => {
      console.error('Error de inicio de sesión:', err);
      this.errorMessage = err.status === 401
        ? 'Credenciales incorrectas'
        : 'Error al conectar con el servidor';
    }
  });
  }
}