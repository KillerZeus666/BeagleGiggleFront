import { Component } from '@angular/core';
import { MascotaService } from 'src/app/service/mascota.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mascotas-tratamiento',
  templateUrl: './mascotas-tratamiento.component.html',
  styleUrls: ['./mascotas-tratamiento.component.css']
})
export class MascotasTratamientoComponent {
  mascotasEnTratamiento: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private mascotaService: MascotaService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const idCliente = Number(this.route.snapshot.paramMap.get('id'));
    this.mascotaService.getMascotasPorCliente(idCliente).subscribe({
      next: (data) => {
        this.mascotasEnTratamiento = data;
      },
      error: (err) => {
        console.error('Error al obtener las mascotas', err);
      }
    });
    this.cargarMascotasEnTratamiento(idCliente); // Reemplaza con el ID del cliente real
  }

  cargarMascotasEnTratamiento(idCliente: number): void {
    this.loading = true;
    this.error = null;
    
    this.mascotaService.getMascotasEnTratamientoPorCliente(idCliente).subscribe({
      next: (mascotas) => {
        this.mascotasEnTratamiento = mascotas;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar mascotas en tratamiento';
        this.loading = false;
        console.error(err);
      }
    });
  }

  verTratamiento(id:number){
    this.router.navigate([' ']);
  }
}
