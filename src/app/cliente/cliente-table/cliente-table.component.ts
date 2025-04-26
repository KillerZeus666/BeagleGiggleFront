import { Component, OnInit } from '@angular/core';
import { ClienteCL } from 'src/app/model/cliente-cl';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service'; // Importar el servicio AuthService

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
    
}
