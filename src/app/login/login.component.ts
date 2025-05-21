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

    this.authService.iniciarSesion(this.username, this.password).subscribe({
      next: (response) => {
        try {
          // Guardar token
          localStorage.setItem('token', response.token);

          // Guardar usuario en authService (opcional)
          this.authService.login({
            username: response.username,
            roles: response.roles,
            token: response.token
          });

          // Asumimos que el rol está en response.roles (lista de strings)
          if (response.roles.includes('CLIENTE')) {
            this.loadClienteData();
          } else if (response.roles.includes('ADMIN')) {
            this.loadAdminData();
          } else if (response.roles.includes('VETERINARIO')) {
            this.loadVeterinarioData();
          } else {
            this.errorMessage = 'Usuario sin rol válido';
          }
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

  private loadClienteData() {
    this.clienteService.clienteHome().subscribe({
      next: (cliente) => {
        if (cliente) {
          this.authService.login({
            id: cliente.idCliente,
            tipo: 'Cliente',
            nombre: cliente.nombre,
            foto: cliente.foto
          });
          this.router.navigate(['/mascotas-cliente', cliente.idCliente]);
        } else {
          this.errorMessage = 'No se encontraron datos de cliente';
        }
      },
      error: (e) => {
        console.error('Error al obtener datos del cliente:', e);
        this.errorMessage = 'Error al obtener datos del cliente';
      }
    });
  }

  private loadAdminData() {
    this.adminService.AdminHome().subscribe({
      next: (admin) => {
        if (admin) {
          this.authService.login({
            id: admin.idAdministrador,
            tipo: 'Admin',
            nombre: admin.nombre,
            foto: admin.foto
          });
          this.router.navigate(['/admin']);
        } else {
          this.errorMessage = 'No se encontraron datos de administrador';
        }
      },
      error: (e) => {
        console.error('Error al obtener datos del admin:', e);
        this.errorMessage = 'Error al obtener datos del admin';
      }
    });
  }

  private loadVeterinarioData() {
    this.veterinarioService.veterinarioHome().subscribe({
      next: (veterinario) => {
        if (veterinario) {
          this.authService.login({
            id: veterinario.idVeterinario,
            tipo: 'Veterinario',
            nombre: veterinario.nombre,
            foto: veterinario.foto
          });
          this.router.navigate(['/detalles-veterinario', veterinario.idVeterinario]);
        } else {
          this.errorMessage = 'No se encontraron datos de veterinario';
        }
      },
      error: (e) => {
        console.error('Error al obtener datos del veterinario:', e);
        this.errorMessage = 'Error al obtener datos del veterinario';
      }
    });
  }
}