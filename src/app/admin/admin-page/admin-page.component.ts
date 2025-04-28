import { Component, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MascotaService } from 'src/app/service/mascota.service';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { forkJoin } from 'rxjs';
import { VeterinarioCL } from 'src/app/model/veterinario-cl';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { TratamientoCL } from 'src/app/model/tratamiento-cl';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { ChartService } from 'src/app/service/chart.service';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminPageComponent implements AfterViewInit {
  @ViewChild('medicamentosChart', { static: false }) medicamentosChartRef!: ElementRef<HTMLCanvasElement>;
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
  top3Medicamentos: {nombre: string, cantidad: number}[] = [];
  
  constructor(
    private authService: AuthService, 
    private mascotaService: MascotaService,
    private veterinarioService: VeterinarioService,
    private tratamientoService: TratamientoService,
    private chartService: ChartService,
    private servicioService: ServicioService
  ) {}

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
    this.userName = this.authService.getUserName();
    this.userPhoto = this.authService.getUserPhoto();
    this.loadAllStats();
    this.loadFinancialData();
    this.loadTop3Medicamentos();
  }

  loadTop3Medicamentos(): void {
    this.tratamientoService.getTop3MedicamentosMasVendidos().subscribe({
      next: (medicamentos) => {
        this.top3Medicamentos = medicamentos;
      },
      error: (err) => {
        console.error('Error al cargar top 3 medicamentos', err);
        // Datos de ejemplo en caso de error
        this.top3Medicamentos = [
          {nombre: 'Vacuna Antirrábica', cantidad: 0},
          {nombre: 'Desparasitación', cantidad: 0},
          {nombre: 'Antibiótico General', cantidad: 0}
        ];
      }
    });
  }

  loadFinancialData(): void {
    forkJoin([
      this.servicioService.obtenerVentasTotales(),
      this.servicioService.obtenerGananciasTotales()
    ]).subscribe({
      next: ([ventas, ganancias]) => {
        this.stats.ventasTotales = ventas;
        this.stats.gananciasTotales = ganancias;
      },
      error: (err) => {
        console.error('Error al cargar datos financieros:', err);
        // Puedes mostrar valores por defecto o un mensaje de error
        this.stats.ventasTotales = 0;
        this.stats.gananciasTotales = 0;
      }
    });
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
    this.loadMedicamentosChart();
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

  loadMedicamentosChart(): void {
    this.tratamientoService.getMedicamentosMasUsados().subscribe({
      next: (data) => {
        this.createMedicamentosChart(data);
      },
      error: (err) => {
        console.error('Error al cargar datos para gráfica de medicamentos', err);
      }
    });
  }

  createMedicamentosChart(data: {medicamento: string, cantidad: number}[]): void {
    if (!this.medicamentosChartRef?.nativeElement) {
      console.error('No se pudo encontrar el elemento canvas');
      return;
    }
  
    const ctx = this.medicamentosChartRef.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('No se pudo obtener el contexto 2D del canvas');
      return;
    }
    
    const config: any = {
      type: 'bar',
      data: {
        labels: data.map(item => item.medicamento),
        datasets: [{
          data: data.map(item => item.cantidad),
          backgroundColor: '#1d95da',
          borderColor: '#1d95db',
          borderWidth: 1,
          barPercentage: 0.8,
          categoryPercentage: 0.9
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                return `${context.parsed.y} tratamientos`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad de tratamientos',
              font: {
                size: 14,
                weight: 'bold',
                family: 'Poppins'
              },
              padding: {top: 20, bottom: 10}
            },
            ticks: {
              font: {
                size: 12,
                family: 'Poppins'
              }
            },
            grid: {
              drawBorder: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Medicamento',
              font: {
                size: 14,
                weight: 'bold',
                family: 'Poppins'
              },
              padding: {top: 10, bottom: 20}
            },
            ticks: {
              font: {
                size: 12,
                family: 'Poppins'
              }
            },
            grid: {
              display: false
            }
          }
        }
      }
    };
  
    this.chartService.createChart(ctx, config);
  }
}