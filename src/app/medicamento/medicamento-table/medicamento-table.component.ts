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

  constructor(
    private medicamentoService: MedicamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.medicamentoService.findAll().subscribe({
      next: (medicamentos: MedicamentoCL[]) => {
        this.medicamentos = medicamentos;
      },
      error: (err) => {
        console.error('Error al cargar los medicamentos', err);
      }
    });
  }
}
