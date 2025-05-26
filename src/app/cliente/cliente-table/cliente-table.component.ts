import { Component, OnInit } from '@angular/core';
import { ClienteCL } from 'src/app/model/cliente-cl';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
 // Importar el servicio AuthService

@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.css']
})
export class ClienteTableComponent implements OnInit {
  
  clienteList: ClienteCL[] = [];
  currentUser: any; // Variable para almacenar el usuario actual
  nombreABuscar: string = '';
  listaClientes: ClienteCL[] = [];


  constructor(
    private clienteService: ClienteService, 
    private router: Router, 
    private authService: AuthService // Inyectar el AuthService
  ) {}

  ngOnInit(): void {
    this.clienteService.findAll().subscribe({
      next: (clientes: ClienteCL[]) => {
        this.clienteList = clientes;
      },
      error: (err) => {
        console.error('Error al cargar los clientes', err);
      }
    });

    // Obtener el usuario actual desde el AuthService
    this.currentUser = this.authService.getUser();
  }

  mostrarCliente(id: number): void {
    this.router.navigate(['/detalles-cliente', id]);
  }

  eliminarCliente(id: number): void {
    this.clienteService.eliminarCliente(id).subscribe({
      next: (respuesta) => {
        console.log('Cliente eliminado:', respuesta);
        this.clienteService.findAll().subscribe({
          next: (clientes: ClienteCL[]) => {
            this.clienteList = clientes;
          },
          error: (err) => {
            console.error('Error al recargar los clientes', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al eliminar el cliente', err);
      }
    });
  }

  abrirFormualarioAgregarCliente(): void {
    this.router.navigate(['/crear-cliente']);
  }

  abrirFormularioEditarCliente(id: number): void {
    this.router.navigate(['/editar-cliente', id]);
  }

  esAdmin(): boolean {
    // Verifica si el usuario es Admin
    return this.currentUser && this.currentUser.tipo === 'Admin';
  }



  buscarCliente() {
      const nombre = this.nombreABuscar.trim();
      
      if (nombre === '') {
        // Si el campo está vacío, muestra todo de nuevo
        this.clienteService.findAll().subscribe({
          next: (clientes: ClienteCL[]) => {
            this.clienteList = clientes;
          },
          error: (err) => {
            console.error('Error al recargar las mascotas:', err);
          }
        });
      } else {
        this.clienteService.buscarPorNombre(nombre).subscribe((resultados) => {
          this.clienteList = resultados;
        });
      }
    }

    exportarExcel(): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.clienteList.map(cliente => ({
    Nombre: cliente.nombre,
    Cédula: cliente.cedula,
    Celular: cliente.celular,
    Correo: cliente.correo
  })));

  const workbook: XLSX.WorkBook = {
    Sheets: { 'Clientes': worksheet },
    SheetNames: ['Clientes']
  };

  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  FileSaver.saveAs(blob, 'Listado_Clientes.xlsx');
}

}