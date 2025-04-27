import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicamentoCL } from 'src/app/model/medicamento-cl';
import { MedicamentoService } from 'src/app/service/medicamento.service';

@Component({
  selector: 'app-medicamento-table',
  templateUrl: './medicamento-table.component.html',
  styleUrls: ['./medicamento-table.component.css']
})
export class MedicamentoTableComponent implements OnInit {
  medicamentos: MedicamentoCL[] = [];
  nombreMedicamentoBuscar: string = '';

  constructor(
    private medicamentoService: MedicamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  cargarMedicamentos(): void {
    this.medicamentoService.findAll().subscribe({
      next: (medicamentos: MedicamentoCL[]) => {
        this.medicamentos = medicamentos;
      },
      error: (err) => {
        console.error('Error al cargar los medicamentos', err);
      }
    });
  }

  buscarMedicamento(): void {
    const nombre = this.nombreMedicamentoBuscar.trim();
    if (nombre === '') {
      this.cargarMedicamentos(); // Si no hay nombre, recarga todos los medicamentos
    } else {
      this.medicamentoService.buscarPorNombre(nombre).subscribe({
        next: (resultados: MedicamentoCL[]) => {
          this.medicamentos = resultados;
        },
        error: (err) => {
          console.error('Error al buscar medicamentos', err);
        }
      });
    }
  }
}
