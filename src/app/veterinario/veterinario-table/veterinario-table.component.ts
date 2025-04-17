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
    if (confirm('¿Está seguro de eliminar este veterinario?')) {
      this.veterinarioService.eliminarVeterinario(id).subscribe({
        next: () => {
          this.cargarVeterinarios();
        },
        error: (err) => {
          console.error('Error al eliminar el veterinario', err);
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
}