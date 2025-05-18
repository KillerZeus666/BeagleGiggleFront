import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css']
})
export class MatchPageComponent implements OnInit {
  selectedMascota: MascotaCL | null = null;
  mascotaList: MascotaCL[] = [];
  nombreABuscar: string = '';
  User: any; // Variable para almacenar el usuario actual

  constructor(
    private mascotaService: MascotaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarMascotas();
    // Si quieres obtener info del usuario
  }

  cargarMascotas(): void {
    this.mascotaService.findAll().subscribe({
      next: (mascotas: MascotaCL[]) => {
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

  buscar(): void {
    const nombre = this.nombreABuscar.trim();
    if (nombre === '') {
      this.cargarMascotas(); // recarga todas si el campo está vacío
    } else {
      this.mascotaService.buscarPorNombre(nombre).subscribe({
        next: (resultados: MascotaCL[]) => {
          this.mascotaList = resultados;
        },
        error: (err) => {
          console.error('Error al buscar mascotas:', err);
        }
      });
    }
  }
    // Objeto para bindear los filtros
  filtros = {
    edadMin: null,
    edadMax: null,
    raza: '',
    pesoMax: null
  };

  // Lista que se muestra con el filtro aplicado
  mascotasFiltradas = [...this.mascotaList];

  aplicarFiltros() {
    this.mascotasFiltradas = this.mascotaList.filter(mascota => {
      const cumpleEdadMin = this.filtros.edadMin == null || mascota.edad >= this.filtros.edadMin;
      const cumpleEdadMax = this.filtros.edadMax == null || mascota.edad <= this.filtros.edadMax;
      const cumpleRaza = this.filtros.raza.trim() === '' || mascota.raza.toLowerCase().includes(this.filtros.raza.trim().toLowerCase());
      const cumplePesoMax = this.filtros.pesoMax == null || mascota.peso <= this.filtros.pesoMax;

      return cumpleEdadMin && cumpleEdadMax && cumpleRaza && cumplePesoMax;
    });
  }

  limpiarFiltros() {
    this.filtros = {
      edadMin: null,
      edadMax: null,
      raza: '',
      pesoMax: null
    };
    this.mascotasFiltradas = [...this.mascotaList];
  }


}
