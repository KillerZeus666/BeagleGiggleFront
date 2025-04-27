// navegacion.component.ts
import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MascotaService } from 'src/app/service/mascota.service';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { forkJoin } from 'rxjs';
import { VeterinarioCL } from 'src/app/model/veterinario-cl';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { TratamientoCL } from 'src/app/model/tratamiento-cl';
import { TratamientoService } from 'src/app/service/tratamiento.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminPageComponent implements AfterViewInit {
  userType: string | null = null;
  userName: string = '';
  userPhoto = 'https://example.com/path-to-your-image.jpg';
  stats = {
    totalMascotas: 0,
    mascotasActivas: 0,
    tratamientosMes: 120,
    veterinariosActivos: 15,
    veterinariosInactivos: 3,
    ventasTotales: 5000,
    gananciasTotales: 2000
  };
  mascotas: MascotaCL[] = [];
  loading = true;
  showMascotasList = false;
  showMascotasActivasList = false;
  mascotasActivas: MascotaCL[] = [];
  showVeterinariosActivosList = false;
  showVeterinariosInactivosList = false;
  veterinariosActivos: VeterinarioCL[] = [];
  veterinariosInactivos: VeterinarioCL[] = [];
  showTratamientosRecientesList = false;
  tratamientosRecientes: TratamientoCL[] = [];
  
  constructor(private authService: AuthService, 
    private mascotaService: MascotaService,
    private veterinarioService: VeterinarioService,
    private tratamientoService: TratamientoService
  ) {}

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
    this.userName = this.authService.getUserName();
    this.userPhoto = this.authService.getUserPhoto();
    this.loadAllStats();
  }

  loadAllStats(): void {
    this.loading = true;
    
    forkJoin([
      this.mascotaService.getCantidadMascotas(),
      this.mascotaService.getCantidadMascotasActivas(),
      this.veterinarioService.getCantidadVeterinariosActivos(),
      this.veterinarioService.getCantidadVeterinariosInactivos(),
      this.tratamientoService.getCantidadTratamientosUltimos30Dias()
    ]).subscribe({
      next: ([totalMascotas, mascotasActivas, vetActivos, vetInactivos, tratamientosRecientes]) => {
        this.stats.totalMascotas = totalMascotas;
        this.stats.mascotasActivas = mascotasActivas;
        this.stats.veterinariosActivos = vetActivos;
        this.stats.veterinariosInactivos = vetInactivos;
        this.stats.tratamientosMes = tratamientosRecientes;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar estadísticas', err);
        this.loading = false;
      }
    });
  }

  // Métodos para tratamientos recientes
  toggleTratamientosRecientesList(): void {
    this.showTratamientosRecientesList = !this.showTratamientosRecientesList;
    if (this.showTratamientosRecientesList && this.tratamientosRecientes.length === 0) {
      this.loadTratamientosRecientes();
    }
  }

  loadTratamientosRecientes(): void {
    this.loading = true;
    this.tratamientoService.getTratamientosUltimos30Dias().subscribe({
      next: (tratamientos) => {
        this.tratamientosRecientes = tratamientos;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar tratamientos recientes', err);
        this.loading = false;
      }
    });
  }

  // Métodos para veterinarios activos
  toggleVeterinariosActivosList(): void {
    this.showVeterinariosActivosList = !this.showVeterinariosActivosList;
    if (this.showVeterinariosActivosList && this.veterinariosActivos.length === 0) {
      this.loadVeterinariosActivos();
    }
  }

  loadVeterinariosActivos(): void {
    this.loading = true;
    this.veterinarioService.getVeterinariosActivos().subscribe({
      next: (veterinarios) => {
        this.veterinariosActivos = veterinarios;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar veterinarios activos', err);
        this.loading = false;
      }
    });
  }

  // Métodos para veterinarios inactivos
  toggleVeterinariosInactivosList(): void {
    this.showVeterinariosInactivosList = !this.showVeterinariosInactivosList;
    if (this.showVeterinariosInactivosList && this.veterinariosInactivos.length === 0) {
      this.loadVeterinariosInactivos();
    }
  }

  loadVeterinariosInactivos(): void {
    this.loading = true;
    this.veterinarioService.getVeterinariosInactivos().subscribe({
      next: (veterinarios) => {
        this.veterinariosInactivos = veterinarios;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar veterinarios inactivos', err);
        this.loading = false;
      }
    });
  }
  
  // Método para alternar la visualización de mascotas activas
  toggleMascotasActivasList(): void {
    this.showMascotasActivasList = !this.showMascotasActivasList;
    if (this.showMascotasActivasList && this.mascotasActivas.length === 0) {
      this.loadMascotasActivas();
    }
  }
  
  // Método para cargar la lista de mascotas activas
  loadMascotasActivas(): void {
    this.loading = true;
    this.mascotaService.getMascotasActivas().subscribe({
      next: (mascotas) => {
        this.mascotasActivas = mascotas;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar mascotas activas', err);
        this.loading = false;
      }
    });
  }

  toggleMascotasList(): void {
    this.showMascotasList = !this.showMascotasList;
    if (this.showMascotasList && this.mascotas.length === 0) {
      this.loadAllMascotas();
    }
  }

  loadAllMascotas(): void {
    this.loading = true;
    this.mascotaService.findAll().subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar mascotas', err);
        this.loading = false;
      }
    });
  }  

  ngAfterViewInit(): void {
    // Obtener los datos del usuario
    this.userType = this.authService.getUserType();
    this.userName = this.authService.getUserName();

    // Código de navegación (sin cambios)
    const listItems = document.querySelectorAll<HTMLLIElement>('.navigation li');
    const toggle = document.querySelector<HTMLElement>('.toggle');
    const navigation = document.querySelector<HTMLElement>('.navigation');
    const main = document.querySelector<HTMLElement>('.main');

    const activeLink = function (this: HTMLLIElement): void {
      listItems.forEach((item) => item.classList.remove('hovered'));
      this.classList.add('hovered');
    };

    listItems.forEach((item) =>
      item.addEventListener('mouseover', activeLink)
    );

    toggle?.addEventListener('click', () => {
      navigation?.classList.toggle('active');
      main?.classList.toggle('active');
    });
  }
}