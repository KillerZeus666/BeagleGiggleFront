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
  opcionOrdenamiento: string = 'id'; // Filtro predeterminado por ID

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
        this.ordenarMedicamentos();  // Ordenar al cargar
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
          this.ordenarMedicamentos(); // Ordenar los resultados
        },
        error: (err) => {
          console.error('Error al buscar medicamentos', err);
        }
      });
    }
  }

  ordenarMedicamentos(): void {
    switch (this.opcionOrdenamiento) {
      case 'id':
        this.medicamentos.sort((a, b) => a.idMedicamento - b.idMedicamento);
        break;
      case 'precioCompraAsc':
        this.medicamentos.sort((a, b) => a.precioCompra - b.precioCompra);
        break;
      case 'precioCompraDesc':
        this.medicamentos.sort((a, b) => b.precioCompra - a.precioCompra);
        break;
      case 'precioVentaAsc':
        this.medicamentos.sort((a, b) => a.precioVenta - b.precioVenta);
        break;
      case 'precioVentaDesc':
        this.medicamentos.sort((a, b) => b.precioVenta - a.precioVenta);
        break;
      default:
        break;
    }
  }
}
