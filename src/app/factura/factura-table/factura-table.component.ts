import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from 'src/app/service/factura.service';
import { FacturaCL } from 'src/app/model/factura-cl';

@Component({
  selector: 'app-factura-table',
  templateUrl: './factura-table.component.html',
  styleUrls: ['./factura-table.component.css']
})
export class FacturaTableComponent {
facturas: FacturaCL[] = [];
  seleccionadas: Set<number> = new Set();
  idCliente: number = 0;
  mensaje: string = '';

  constructor(
    private route: ActivatedRoute,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idCliente = +params['id'];
      this.cargarFacturas();
    });
  }

  cargarFacturas(): void {
  this.facturaService.getFacturaPorIdCLiente(this.idCliente).subscribe(
    datos => {
      const todas = datos.map(f => FacturaCL.fromBackendData(f));
      this.facturas = todas.filter(factura => !factura.pagada); // <-- solo no pagadas
    },
    error => console.error('Error al cargar facturas', error)
  );
}

  toggleSeleccion(idFactura: number): void {
    if (this.seleccionadas.has(idFactura)) {
      this.seleccionadas.delete(idFactura);
    } else {
      this.seleccionadas.add(idFactura);
    }
  }

  pagar(): void {
    const ids = Array.from(this.seleccionadas);
    this.facturaService.pagarFacturas(ids).subscribe(
      (respuesta: string) => {
        this.mensaje = respuesta;
        this.cargarFacturas();
        this.seleccionadas.clear();
      },
      error => {
        this.mensaje = 'Error al pagar las facturas';
        console.error(error);
      }
    );
  }

  irAComprar(tipo: string): void {
    // Reemplaza estas rutas con las reales de tu aplicación
    if (tipo === 'servicio') {
      // Lógica para redireccionar a la pantalla de compra de servicios
    } else {
      // Lógica para redireccionar a la pantalla de compra de medicamentos
    }
  }
}
