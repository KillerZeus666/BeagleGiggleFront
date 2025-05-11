import { Component, OnInit } from '@angular/core';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { TratamientoCL } from 'src/app/model/tratamiento-cl';
import { Router, ActivatedRoute } from '@angular/router';
import { FacturaService } from 'src/app/service/factura.service';
import { FacturaCL } from 'src/app/model/factura-cl';
import { ClienteService } from 'src/app/service/cliente.service';
import { ClienteCL } from 'src/app/model/cliente-cl';



@Component({
  selector: 'app-tratamiento-table',
  templateUrl: './tratamiento-table.component.html',
  styleUrls: ['./tratamiento-table.component.css']
})
export class TratamientoTableComponent {
  metodoDePagoSeleccionado: string = '';
  tratamientos: TratamientoCL[] = [];
  tratamientosSeleccionados: TratamientoCL[] = [];
  metodoDePago: string = '';
  idCliente: number = 0;
  clienteseleccionado!:ClienteCL;
  constructor(
    private facturaService:FacturaService, 
    private clienteService:ClienteService,
    private tratamientoService: TratamientoService,
    private route: ActivatedRoute,
    private router: Router
  ) {} 
  
  ngOnInit(): void {
    const state = history.state;
    this.idCliente = state.idCliente ?? null;
    console.log(this.idCliente);
    const idVeterinario = Number(this.route.snapshot.paramMap.get('id'));
    console.log('idVeterinario recibido:', idVeterinario); // 👈
  
    this.tratamientoService.getTratamientosPorMascota(idVeterinario).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // 👈
        this.tratamientos = data;
      },
      error: (err) => {
        console.error('Error al obtener las mascotas', err);
      }
    });
  }
  
  onCheckboxChange(event: any, tratamiento: TratamientoCL) {
  if (event.target.checked) {
    this.tratamientosSeleccionados.push(tratamiento);
  } else {
    this.tratamientosSeleccionados = this.tratamientosSeleccionados.filter(t => t.idTratamiento !== tratamiento.idTratamiento);
  }
}

facturar(){
  if (!this.metodoDePago) {
      alert('Seleccione un método de pago.');
      return;
    }

    this.clienteService.getCliente(this.idCliente).subscribe({
      next: (clientedata) =>{
        this.clienteseleccionado = clientedata;
        console.log('cliente', clientedata);
        console.log('metodo de pago', this.metodoDePago)
        console.log('tratamientos', this.tratamientosSeleccionados)
      },
      error: (err) => {
        console.error('no se encontro el cliente', err);
      }
    });

    const factura = new FacturaCL(
        0,
        new Date(),
        0,
        false,
        this.metodoDePago,
        this.clienteseleccionado,
        null,
        null,
        []
      );

    const idsTratamientos = this.tratamientosSeleccionados.map(t => t.idTratamiento);

    this.facturaService.crearFacturaPorTratamientos(this.idCliente, idsTratamientos , factura ).subscribe({
      next: () => {
          alert('Factura creada con éxito.');
          this.tratamientosSeleccionados = [];
          this.metodoDePago = '';
      },
      error: (err) => {
        console.error(err);
      }
    });
}
  
}


