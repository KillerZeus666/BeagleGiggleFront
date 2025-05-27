  import { Component, OnInit } from '@angular/core';
  import { TratamientoService } from 'src/app/service/tratamiento.service';
  import { TratamientoCL } from 'src/app/model/tratamiento-cl';
  import { Router, ActivatedRoute } from '@angular/router';
  import { FacturaService } from 'src/app/service/factura.service';
  import { FacturaCL } from 'src/app/model/factura-cl';
  import { ClienteService } from 'src/app/service/cliente.service';
  import { ClienteCL } from 'src/app/model/cliente-cl';
  import { AuthService } from 'src/app/service/auth.service';
  import { forkJoin } from 'rxjs';


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
    factura!:FacturaCL;
    facturasMap: Map<number, FacturaCL | null> = new Map();
    userType: string = '';
    constructor(
      private facturaService:FacturaService, 
      private clienteService:ClienteService,
      private tratamientoService: TratamientoService,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService
    ) {} 
    
    ngOnInit(): void {
      this.userType = this.authService.getUserType() ?? '';
      console.log('Tipo de usuario:', this.userType);
      const state = history.state;
      this.idCliente = state.idCliente ?? null;
      console.log(this.idCliente);
      const id = Number(this.route.snapshot.paramMap.get('id'));
      console.log('idVeterinario recibido:', id); // 👈
      
      if(this.authService.getUserType() === 'Cliente'){
        this.tratamientoService.getTratamientosPorMascota(id).subscribe({
        next: (data) => {
          this.tratamientos = data;

            // Por cada tratamiento, cargar su factura asociada
            const observables = this.tratamientos.map(tratamiento => 
              this.facturaService.obtenerFacturaPorTratamiento(tratamiento.idTratamiento)
            );

            forkJoin(observables).subscribe(facturas => {
              facturas.forEach((factura, index) => {
                this.facturasMap.set(this.tratamientos[index].idTratamiento, factura);
              });
            });
          },
          error: (err) => {
            console.error('Error al obtener tratamientos', err);
          }
        });
      }else if(this.authService.getUserType() === 'Admin'){
        this.tratamientoService.findAll().subscribe({
          next:(data)=>{
            this.tratamientos = data;

            // Por cada tratamiento, cargar su factura asociada
            const observables = this.tratamientos.map(tratamiento => 
              this.facturaService.obtenerFacturaPorTratamiento(tratamiento.idTratamiento)
            );

            forkJoin(observables).subscribe(facturas => {
              facturas.forEach((factura, index) => {
                this.facturasMap.set(this.tratamientos[index].idTratamiento, factura);
              });
            });
          },
          error: (err) => {
            console.error('Error al obtener tratamientos', err);
          }
        });
      }
      
    } 

    estadoFactura(tratamiento: TratamientoCL): string {
      const factura = this.facturasMap.get(tratamiento.idTratamiento);
      if (!factura) {
        return 'Factura no generada';
      }
      if (factura.pagada === false) {
        return 'Pendiente';
      }
      if (factura.pagada === true) {
        return 'Pagada';
      }
      return '';
    }

    puedeFacturar(tratamiento: TratamientoCL): boolean {
      const factura = this.facturasMap.get(tratamiento.idTratamiento);
      // Sólo se puede seleccionar si no hay factura o factura está pagada (porque si está pendiente o pagada no se puede generar otra)
      return !factura ;
    }

    
    onCheckboxChange(event: any, tratamiento: TratamientoCL) {
      if (!this.puedeFacturar(tratamiento)) {
        event.target.checked = false; // por seguridad, desmarcar si no debería
        return;
      }
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
      next: (clientedata) => {
        this.clienteseleccionado = clientedata;

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

        this.facturaService.crearFacturaPorTratamientos(this.idCliente, idsTratamientos, factura).subscribe({
          next: () => {
            alert('Factura creada con éxito.');
            this.tratamientosSeleccionados = [];
            this.metodoDePago = '';
            window.location.reload();
          },
          error: (err) => {
            console.error(err);
          }
        });
      },
      error: (err) => {
        console.error('no se encontró el cliente', err);
      }
    });
  }

    
  }


