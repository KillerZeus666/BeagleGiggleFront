import { Component, OnInit } from '@angular/core';
import { ServicioCL } from 'src/app/model/servicio-cl';// o la ruta correcta
import { ServicioService } from 'src/app/service/servicio.service';
import { FacturaCL } from 'src/app/model/factura-cl';  // o la ruta correcta
import { FacturaService } from 'src/app/service/factura.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteCL } from 'src/app/model/cliente-cl';
@Component({
  selector: 'app-comprar-servicio',
  templateUrl: './comprar-servicio.component.html',
  styleUrls: ['./comprar-servicio.component.css']
})
export class ComprarServicioComponent implements OnInit {
   servicios: ServicioCL[] = [];
  servicioSeleccionadoId: number | null = null;
  metodoPagoSeleccionado: string | null = null;
  Cliente!: ClienteCL;
  Servicio!: ServicioCL;
  constructor(private facturaService: FacturaService,
              private servicioService: ServicioService,
              private clienteService: ClienteService,
              private route: ActivatedRoute,
              private router: Router
  ) {}

  ngOnInit() {
    const idCliente = Number(this.route.snapshot.params['id']);
    console.log('ID del cliente recibido:', idCliente);
    this.clienteService.getCliente(idCliente).subscribe({
      next: (clienteData) => {
        this.Cliente = clienteData;
        console.log('Cliente obtenido:', this.Cliente);
      }
      , error: (err) => {
        console.error('Error al obtener el cliente', err);
      }
    });
    this.cargarServicios();
  }

  cargarServicios() {
    this.servicioService.findAll().subscribe({
      next: (data) => {
        this.servicios = data;
        console.log('Servicios cargados:', this.servicios);
      }
      , error: (err) => {
        console.error('Error al cargar los servicios', err);
      }
    });
  }

  onServicioChange() {
    // Si quieres hacer algo cuando cambie el servicio seleccionado, acá va
    this.metodoPagoSeleccionado = null; // resetea el método de pago
  }

  generarFactura() {
    if (!this.servicioSeleccionadoId || !this.metodoPagoSeleccionado) {
      alert('Debe seleccionar un servicio y un método de pago');
      this.servicioService.obtenerServicioPorId(this.servicioSeleccionadoId!).subscribe({
        next: (serviciodata) => {
          this.Servicio = serviciodata;
          console.log('Servicio seleccionado:', this.Servicio);    
        },
        error: (err) => {
          console.error('Error al obtener el servicio', err);
        }
      });
      return;
    }

    const factura = new FacturaCL(
      0,
      new Date(),
      0, 
      false,
      this.metodoPagoSeleccionado,
      this.Cliente,
      null,
      this.Servicio,
      [] 
    );

    // Llamas a tu servicio para crear la factura
    this.facturaService
      .crearFacturaPorServicio(this.Cliente.idCliente, this.servicioSeleccionadoId, factura)
      .subscribe({
        next: (res) => {
          alert('Factura creada con éxito')
          console.log('Factura creada:', res);
          this.router.navigate(['/facturas/cliente', this.Cliente.idCliente]);
        },
        error: (err) => {
          alert('Error al crear factura')
          console.error('Error al crear la factura', err);},
      });
  }
}
