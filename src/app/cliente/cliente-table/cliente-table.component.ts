import { Component, OnInit } from '@angular/core';
import { ClienteCL } from 'src/app/model/cliente-cl';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-table',
  templateUrl: './cliente-table.component.html',
  styleUrls: ['./cliente-table.component.css']
})
export class ClienteTableComponent implements OnInit {
  
  clienteList:ClienteCL[] = [];

  constructor(private clienteService:ClienteService, private router: Router){}

  ngOnInit(): void {
    this.clienteService.findAll().subscribe({
      next: (clientes: ClienteCL[]) => {
        this.clienteList = clientes;
      },
      error: (err) => {
        console.error('Error al cargar los clientes', err);
      }
    });
  }

  mostrarCliente(id:number){
    this.router.navigate(['/detalles-cliente',id]);
  }

  eliminarCliente(id:number){
    this.clienteService.eliminarCliente(id).subscribe({
      next: (respuesta) =>{
        console.log('Cliente eliminado:', respuesta);
        this.clienteService.findAll().subscribe({
          next: (clientes: ClienteCL[]) => {
            this.clienteList=clientes;
          },
          error: (err) => {
            console.error('Error al recargar los clientes',err);
          }
        });
      },
      error: (err) => {
        console.error('Error al eliminar el cliente', err);
      }
    });
  }

  abrirFormualarioAgregarCliente(){
    this.router.navigate(['/crear-cliente']);
  }

  abrirFormularioEditarCliente(id:number){
    this.router.navigate(['/editar-cliente',id]);
  }
}
