import { Component, OnInit, ViewChild } from '@angular/core';
import { TestimonioService } from 'src/app/service/testimonio.service';
import { TestimonioCreateCL } from 'src/app/model/testimonio-create';
import { AuthService } from 'src/app/service/auth.service';
import { ServicioService } from 'src/app/service/servicio.service';
import { ServicioCL } from 'src/app/model/servicio-cl';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testimonio',
  templateUrl: './testimonio-form.component.html',
  styleUrls: ['./testimonio-form.component.css']
})

export class TestimonioFormComponent implements OnInit {
  @ViewChild('testimonioForm') testimonioForm!: NgForm;
  testimonio: TestimonioCreateCL = new TestimonioCreateCL();
  servicios: ServicioCL[] = [];
  idCliente: number = 0;
  errors: string[] = [];

  constructor(
    private testimonioService: TestimonioService,
    private authService: AuthService,
    private servicioService: ServicioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idCliente = this.authService.getUserId() ?? 0;
    this.loadServicios();
  }

  loadServicios(): void {
    this.servicioService.findAll().subscribe({
      next: (servicios) => {
        this.servicios = servicios;
      },
      error: (err) => {
        console.error('Error loading services:', err);
      }
    });
  }

  onSubmit(): void {
    this.errors = [];
    
    // Validaciones
    if (!this.testimonio.texto || this.testimonio.texto.trim().length < 10) {
      this.errors.push('El testimonio debe tener al menos 10 caracteres');
    }
    
    if (this.testimonio.calificacion < 1 || this.testimonio.calificacion > 5) {
      this.errors.push('La calificación debe estar entre 1 y 5');
    }
    
    if (!this.testimonio.idServicio) {
      this.errors.push('Debe seleccionar un servicio');
    }

    if (this.errors.length > 0) {
      return;
    }

    // Asignar cliente
    this.testimonio.idCliente = this.idCliente;

    this.testimonioService.crearTestimonio(this.testimonio).subscribe({
      next: () => {
        this.router.navigate(['/perfil']);
        alert('¡Gracias por tu testimonio!');
      },
      error: (err) => {
        console.error('Error creating testimonial:', err);
        this.errors = ['Error al enviar el testimonio. Inténtalo nuevamente.'];
      }
    });
  }
}