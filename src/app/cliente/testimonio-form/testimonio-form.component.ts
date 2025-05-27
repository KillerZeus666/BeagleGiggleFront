import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TestimonioService } from 'src/app/service/testimonio.service';
import { TestimonioCreateCL } from 'src/app/model/testimonio-create';
import { AuthService } from 'src/app/service/auth.service';
import { ServicioService } from 'src/app/service/servicio.service';
import { ServicioCL } from 'src/app/model/servicio-cl';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-testimonio',
  templateUrl: './testimonio-form.component.html',
  styleUrls: ['./testimonio-form.component.css']
})
export class TestimonioFormComponent implements OnInit {
  @ViewChild('testimonioForm') testimonioForm!: NgForm;

  testimonio: TestimonioCreateCL = new TestimonioCreateCL();
  servicios: ServicioCL[] = [];
  errors: string[] = [];
  hoverValue: number = 0;
  idCliente: number = 0;

  constructor(
    private testimonioService: TestimonioService,
    private clienteService:ClienteService,
    private authService: AuthService,
    private servicioService: ServicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.clienteService.getCliente(userId).subscribe({
        next: (cliente) => {
          this.testimonio.cliente = cliente;
          console.log('cliente cargado:', cliente);
        }
      });
    } else {
      this.errors.push('Debe iniciar sesión para dejar un testimonio');
      return;
    }

    this.loadServicios();
  }

  loadServicios(): void {
    this.servicioService.findAll().subscribe({
      next: (servicios) => {
        this.servicios = servicios;
      },
      error: (err) => {
        console.error('Error al cargar servicios:', err);
        this.errors.push('No se pudieron cargar los servicios.');
      }
    });
  }

  // ⭐️ Seleccionar estrella (calificación)
  selectStar(value: number): void {
    this.testimonio.calificacion = value;
    if (this.testimonioForm?.controls['calificacion']) {
      this.testimonioForm.controls['calificacion'].markAsTouched();
    }
  }

  // ⭐️ Al pasar el mouse por encima
  hoverStar(value: number): void {
    this.hoverValue = value;
  }

  // ⭐️ Salir del hover
  resetStars(): void {
    this.hoverValue = 0;
  }

  // ✅ Envío del formulario
  onSubmit(): void {
    this.errors = [];

    // Validaciones
    if (!this.testimonio.texto || this.testimonio.texto.trim().length < 10) {
      this.errors.push('El testimonio debe tener al menos 10 caracteres.');
    }

    if (!this.testimonio.calificacion || this.testimonio.calificacion < 1 || this.testimonio.calificacion > 5) {
      this.errors.push('Debe seleccionar una calificación entre 1 y 5 estrellas.');
    }
    console.log('Testimonio antes de enviar:', this.testimonio);
    // Enviar testimonio
    this.testimonioService.crearTestimonio(this.testimonio).subscribe({
      next: () => {
        alert('¡Gracias por tu testimonio!');
        this.testimonioForm.resetForm(); // Resetea el formulario y su estado de validación
        this.testimonio = new TestimonioCreateCL(); // Resetea el modelo también
        this.hoverValue = 0; // Resetea las estrellas (calificación)
        this.router.navigate(['/testimonio/crear']);
      },
      error: (err) => {
        console.error('Error al enviar testimonio:', err);
        this.errors = ['Ocurrió un error al enviar el testimonio. Inténtalo más tarde.'];
      }
    });
  }
}
