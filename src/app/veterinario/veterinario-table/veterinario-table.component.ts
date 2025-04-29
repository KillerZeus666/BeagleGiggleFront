import { Component, OnInit } from '@angular/core';
import { VeterinarioCL } from 'src/app/model/veterinario-cl';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veterinario-table',
  templateUrl: './veterinario-table.component.html',
  styleUrls: ['./veterinario-table.component.css']
})
export class VeterinarioTableComponent implements OnInit {
  veterinarioList: VeterinarioCL[] = [];
  nombreVeterinarioBuscar: string = ''; // Variable para almacenar el nombre del veterinario a buscar
  veterinarios: VeterinarioCL[] = []; // Variable para almacenar los resultados de la búsqueda


  constructor(
    private veterinarioService: VeterinarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarVeterinarios();
  }

  cargarVeterinarios(): void {
    this.veterinarioService.obtenerTodosVeterinarios().subscribe({
      next: (veterinarios) => {
        this.veterinarioList = veterinarios;
      },
      error: (err) => {
        console.error('Error al cargar los veterinarios', err);
      }
    });
  }

  mostrarVeterinario(id: number): void {
    this.router.navigate(['/detalles-veterinario', id]);
  }

  eliminarVeterinario(id: number): void {
    if (confirm('¿Está seguro de desactivar este veterinario?')) {
      this.veterinarioService.cambiarEstadoVeterinario(id).subscribe({
        next: (response: any) => {
          console.log('Respuesta del servidor:', response);
          if (response) {
            this.cargarVeterinarios();  // Recarga la lista de veterinarios
          }
        },
        error: (err) => {
          console.error('Error al cambiar el estado del veterinario', err);
        }
      });
    }
  }



  abrirFormularioAgregarVeterinario(): void {
    this.router.navigate(['/crear-veterinario']);
  }

  abrirFormularioEditarVeterinario(id: number): void {
    this.router.navigate(['/editar-veterinario', id]);
  }

    buscarVeterinario(): void {
      const nombre = this.nombreVeterinarioBuscar.trim();
      if (nombre === '') {
        this.cargarVeterinarios(); // Si no hay nombre, recarga todos los medicamentos
      } else {
        this.veterinarioService.buscarPorNombre(nombre).subscribe({
          next: (resultados: VeterinarioCL[]) => {
            this.veterinarios = resultados;
          },
          error: (err) => {
            console.error('Error al buscar medicamentos', err);
          }
        });
      }
    }
}
