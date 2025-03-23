import { Component, OnInit } from '@angular/core';
import { Mascota } from '../mascota';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-mascota-table',
  templateUrl: './mascota-table.component.html',
  styleUrls: ['./mascota-table.component.css']
})
export class MascotaTableComponent implements OnInit {
  selectedMascota: Mascota | null = null;
  mascotaList: Mascota[] = [];

  constructor(private mascotaService: MascotaService) {}

  ngOnInit(): void {
    this.mascotaService.findAll().subscribe({
      next: (mascotas: Mascota[]) => {
        this.mascotaList = mascotas;
      },
      error: (err) => {
        console.error('Error al cargar las mascotas:', err);
      }
    });
  }
  
  mostrarMascota(mascota: Mascota) {
    this.selectedMascota = mascota;
  }

  agregarMascota(mascota: Mascota) {
    this.mascotaService.agregarMascota(mascota);
    this.mascotaList = this.mascotaService.findAllSync();
  }

  eliminarMascota(mascota: Mascota) {
    this.mascotaService.eliminarMascota(mascota);
    this.mascotaList = this.mascotaService.findAllSync();
  }
}
