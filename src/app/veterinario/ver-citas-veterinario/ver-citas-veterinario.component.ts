import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitaCL } from 'src/app/model/cita-cl';

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
    private veterinarioService: VeterinarioService
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
  }

  mostrarDetallesCita(id: number): void {
    this.router.navigate(['/detalles-cita', id]);
  }
}