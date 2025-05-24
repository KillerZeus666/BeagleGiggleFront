import { Component, OnInit } from '@angular/core';
import { VeterinarioCL } from 'src/app/model/veterinario-cl';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-veterinario-table',
  templateUrl: './veterinario-table.component.html',
  styleUrls: ['./veterinario-table.component.css']
})
export class VeterinarioTableComponent implements OnInit {
  veterinarioList: VeterinarioCL[] = [];
  nombreVeterinarioBuscar: string = ''; // Variable para almacenar el nombre del veterinario a buscar
  veterinarios: VeterinarioCL[] = []; // Variable para almacenar los resultados de la búsqueda


  constructor(
    private veterinarioService: VeterinarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarVeterinarios();
  }

  cargarVeterinarios(): void {
    this.veterinarioService.obtenerTodosVeterinarios().subscribe({
      next: (veterinarios) => {
        this.veterinarioList = veterinarios;
      },
      error: (err) => {
        console.error('Error al cargar los veterinarios', err);
      }
    });
  }

  mostrarVeterinario(id: number): void {
    this.router.navigate(['/detalles-veterinario', id]);
  }

  eliminarVeterinario(id: number): void {
    if (confirm('¿Está seguro de desactivar este veterinario?')) {
      this.veterinarioService.cambiarEstadoVeterinario(id).subscribe({
        next: (response: any) => {
          console.log('Respuesta del servidor:', response);
          if (response) {
            this.cargarVeterinarios();  // Recarga la lista de veterinarios
          }
        },
        error: (err) => {
          console.error('Error al cambiar el estado del veterinario', err);
        }
      });
    }
  }



  abrirFormularioAgregarVeterinario(): void {
    this.router.navigate(['/crear-veterinario']);
  }

  abrirFormularioEditarVeterinario(id: number): void {
    this.router.navigate(['/editar-veterinario', id]);
  }

    buscarVeterinario(): void {
      const nombre = this.nombreVeterinarioBuscar.trim();
      if (nombre === '') {
        this.cargarVeterinarios(); // Si no hay nombre, recarga todos los medicamentos
      } else {
        this.veterinarioService.buscarPorNombre(nombre).subscribe({
          next: (resultados: VeterinarioCL[]) => {
            this.veterinarios = resultados;
          },
          error: (err) => {
            console.error('Error al buscar medicamentos', err);
          }
        });
      }
    }

    exportarExcel(): void {
  const veterinariosExportar = this.veterinarioList.map(vet => ({
    Nombre: vet.nombre,
    Cédula: vet.cedula,
    Especialidad: vet.especialidad,
    Sede: vet.sede,
    Estado: vet.estado === 1 ? 'Activo' : 'Inactivo'
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(veterinariosExportar);
  const workbook: XLSX.WorkBook = { Sheets: { 'Veterinarios': worksheet }, SheetNames: ['Veterinarios'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  FileSaver.saveAs(blob, 'ListaVeterinarios.xlsx');
}

}
