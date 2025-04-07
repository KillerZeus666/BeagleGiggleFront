import { Component, OnInit } from '@angular/core';
import { Mascota } from '../mascota';
import { MascotaService } from 'src/app/service/mascota.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascota-table',
  templateUrl: './mascota-table.component.html',
  styleUrls: ['./mascota-table.component.css']
})
export class MascotaTableComponent implements OnInit {
  selectedMascota: Mascota | null = null;
  mascotaList: Mascota[] = [];

  constructor(private mascotaService: MascotaService, private router: Router) {}

  ngOnInit(): void {
    this.cargarMascotas();
  }

  cargarMascotas(): void {
    this.mascotaService.findAll().subscribe({
      next: (mascotas: Mascota[]) => {
        this.mascotaList = mascotas;
      },
      error: (err) => {
        console.error('Error al cargar las mascotas:', err);
      }
    });
  }

  mostrarMascota(id: number): void {
    this.router.navigate(['/detalles-mascota', id]);
  }

  agregarMascota(mascota: Mascota): void {
    const idCliente = 1; // Reemplaza con el id real si lo tienes disponible
    this.mascotaService.agregarMascota(mascota, idCliente).subscribe({
      next: () => {
        console.log('Mascota agregada');
        this.cargarMascotas();
      },
      error: (err) => {
        console.error('Error al agregar mascota:', err);
      }
    });
  }

  eliminarMascota(mascota: Mascota): void {
    this.mascotaService.deleteMascota(mascota.idMascota).subscribe({
      next: () => this.cargarMascotas(),
      error: (err) => console.error('Error al eliminar mascota:', err)
    });
    
  }

  abrirFormularioMascota(): void {
    this.router.navigate(['/crear-mascota']);
  }

  abrirFormularioMascotaEdicion(id: number): void {
    this.router.navigate(['/editar-mascota', id]);
  }
}
