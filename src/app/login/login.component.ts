import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ClienteCL } from '../model/cliente-cl';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  cliente!: ClienteCL;

  constructor(private router: Router, private authService: AuthService, private clienteService:ClienteService) {}

  ngOnInit(): void {
    // Solo llenar el formulario automáticamente para pruebas
    this.username = 'carlosg';
    this.password = 'pass2';
  }

  onSubmit() {

    this.clienteService.loginSencillo(this.username,this.password).subscribe({
      next: (clienteData) => {
        this.cliente = clienteData;
      },
      error: (err) =>{
        console.error(err);
      }
    });

    // Validar si coincide con los datos quemados
    if (this.cliente !== null && this.cliente !== undefined) {
      // Login manual (quemado) para cliente
      this.authService.login({
        id: this.cliente.idCliente,
        tipo: 'Cliente',
        nombre: this.cliente.nombre,
        foto: this.cliente.foto
      });
      this.router.navigate(['/mascotas-cliente',this.cliente.idCliente]);
    } else if (this.username === 'admin' && this.password === '1234') {
      // Login manual (quemado) para admin
      this.authService.login({
        id: 1,
        tipo: 'Admin',
        nombre: 'Administrador',
        foto: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png' // Icono de admin
      });
      this.router.navigate(['/admin']);
    } else if (this.username === 'vet1' && this.password === 'pass1') {
      // Login manual (quemado) para veterinario
      this.authService.login({
        id: 1,
        tipo: 'Veterinario',
        nombre: 'Dra. Martínez',
        foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDcaEWpYQklMDUzSJPss_l5V9T7yC2xtK7OA&s	' // Foto de veterinario (puedes usar una foto real)
      });
      this.router.navigate(['/detalles-veterinario/2']);
    } else {
      // Si no, usar el login normal con el backend
      this.authService.iniciarSesion(this.username, this.password).subscribe(
        (cliente) => {
          this.authService.login({
            id: cliente.idCliente,
            tipo: 'Cliente',
            nombre: cliente.nombreUsuario,
            foto: cliente.foto
          });
          this.router.navigate(['/mascotas-cliente/' + cliente.idCliente]);
        },
        (error) => {
          console.error('Error de inicio de sesión:', error);
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        }
      );
    }
  }
}
