import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaCL } from 'src/app/model/cita-cl';
import { CitaService } from 'src/app/service/cita.service';

import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-ver-citas-veterinario',
  templateUrl: './ver-citas-veterinario.component.html',
  styleUrls: ['./ver-citas-veterinario.component.css']
})
export class VerCitasVeterinarioComponent implements OnInit {
  citas: CitaCL[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veterinarioService: VeterinarioService,
    private citaService: CitaService
  ) {}

  ngOnInit(): void {
    const idVeterinario = Number(this.route.snapshot.paramMap.get('id'));
    this.veterinarioService.obtenerCitasAgendadas(idVeterinario).subscribe({
      next: (data) => {
        this.citas = data;
      },
      error: (err) => {
        console.error('Error al obtener las citas', err);
      }
    });
    this.obtenerCitas();
  }

  mostrarDetallesCita(id: number): void {
    this.router.navigate(['/detalles-cita', id]);
  }

  agendarCita(){

  }

  editarCita(){

  }
  // Método simplificado para cancelar cita
  cancelarCita(idCita: number): void {
    if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      this.citaService.cancelarCita(idCita).subscribe({
        next: () => {
          window.location.reload(); // Recarga la página
        },
        error: (error) => {
          console.error('Error al cancelar cita:', error);
          alert('Ocurrió un error al cancelar la cita');
        }
      });
    }
  }

  obtenerCitas(): void {
    this.citaService.obtenerTodasCitas().subscribe({
      next: (citas) => {
        this.citas = citas;
      },
      error: (err) => {
        console.error('Error al obtener citas:', err);
      }
    });
  }
}

