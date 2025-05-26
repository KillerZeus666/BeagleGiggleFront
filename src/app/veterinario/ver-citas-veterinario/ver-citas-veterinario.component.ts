import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaCL } from 'src/app/model/cita-cl';
import { AuthService } from 'src/app/service/auth.service';
import { CitaService } from 'src/app/service/cita.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-ver-citas-veterinario',
  templateUrl: './ver-citas-veterinario.component.html',
  styleUrls: ['./ver-citas-veterinario.component.css']
})
export class VerCitasVeterinarioComponent implements OnInit {
  userType: string | null = null;
  citas: CitaCL[] = [];
  isSidebarCollapsed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veterinarioService: VeterinarioService,
    private citaService: CitaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const idCliente = Number(this.route.snapshot.paramMap.get('id'))
    this.userType = this.authService.getUserType();

    if(this.userType == 'Veterinario'){
      this.loadCitas();
    }
    else if(this.userType == 'Cliente'){
      this.citaService.obtenerCitasPorCliente(idCliente).subscribe({
        next: (citadata) => {
          this.citas = citadata.filter(cita => cita.estado.toLowerCase() !== 'cancelada');
        },
        error: (err) => {
          console.error('Error al obtener las citas', err);
        }
      });
    }
    
  }

  loadCitas(): void {
    const idVeterinario = Number(this.route.snapshot.paramMap.get('id'));
    if (idVeterinario) {
      this.loadVeterinarioCitas(idVeterinario);
    } else {
      this.loadAllCitas();
    }
  }

  loadVeterinarioCitas(idVeterinario: number): void {
    this.veterinarioService.obtenerCitasAgendadas(idVeterinario).subscribe({
      next: (data) => this.citas = data,
      error: (err) => {
        console.error('Error al obtener citas del veterinario', err);
        this.loadAllCitas();
      }
    });
  }

  loadAllCitas(): void {
    this.citaService.obtenerTodasCitas().subscribe({
      next: (citas) => {
        this.citas = citas.filter(cita => cita.estado.toLowerCase() !== 'cancelada');
    },
      error: (err) => console.error('Error al obtener todas las citas:', err)
    });
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  mostrarDetallesCita(idCita: number): void {
    this.router.navigate(['/detalles-cita', idCita]);
  }

  agendarCita(): void {
    if(this.userType == 'Veterinario') {
      const idVeterinario = Number(this.route.snapshot.paramMap.get('id'));
      this.router.navigate(['/agendar-cita'], { 
        state: { idVeterinario: idVeterinario } 
      });
    } else if(this.userType == 'Cliente') {
      const idCliente = Number(this.route.snapshot.paramMap.get('id'));
      this.router.navigate(['/agendar-cita'], {
        state: { idCliente: idCliente } // Corregido a minúscula 'l' en 'idCliente'
      });
    } 
  }

  editarCita(idCita: number): void {
    this.router.navigate(['/editar-cita', idCita]);
  }

  cancelarCita(idCita: number): void {
    if (confirm('¿Estás seguro de cancelar esta cita?')) {
      this.citaService.cancelarCita(idCita).subscribe({
        next: () => this.loadAllCitas(),
        error: (error) => {
          console.error('Error al cancelar cita:', error);
          alert('Error al cancelar la cita');
        }
      });
    }
  }
}
