import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Solo llenar el formulario automáticamente
    this.username = 'carlosg';
    this.password = 'pass2';
  }

  onSubmit() {
    // Validar si coincide con los datos quemados
    if (this.username === 'carlosg' && this.password === 'pass2') {
      // Login manual (quemado)
      this.authService.login({
        id: 2,
        tipo: 'Cliente',
        nombre: 'Carlos Gómez',
        foto: 'https://www.donnamoderna.com/content/uploads/2022/07/Donna-sorridente-830x625.jpg'
      });
      // Después del login, navegar
      this.router.navigate(['/mascotas-cliente/2']);
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
