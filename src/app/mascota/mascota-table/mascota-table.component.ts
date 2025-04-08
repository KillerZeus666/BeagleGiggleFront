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
    this.mascotaService.findAll().subscribe({
      next: (mascotas: Mascota[]) => {
        this.mascotaList = mascotas;
      },
      error: (err) => {
        console.error('Error al cargar las mascotas:', err);
      }
    });
  }
  
  mostrarMascota(id: number) {
    this.router.navigate(['/detalles-mascota', id]);
  }

  agregarMascota(mascota: Mascota) {
    const idCliente = mascota.clienteId; 
  this.mascotaService.agregarMascota(mascota, idCliente).subscribe({
    next: (nuevaMascota) => {
      this.mascotaList.push(nuevaMascota);
    },
    error: (err) => {
      console.error('Error al agregar mascota:', err);
    }
  });
  }

  eliminarMascota(mascota: Mascota) {
    this.mascotaService.eliminarMascota(mascota.idMascota);
  }

  abrirFormularioMascota(){
    this.router.navigate(['/crear-mascota']);
  }

  abrirFormularioMascotaEdicion(id:number){
    this.router.navigate(['/editar-mascota',id]);
  }
}
