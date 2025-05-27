import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteCL } from 'src/app/model/cliente-cl';
import { FacturaCL } from 'src/app/model/factura-cl';
import { MedicamentoCL } from 'src/app/model/medicamento-cl';
import { ClienteService } from 'src/app/service/cliente.service';
import { FacturaService } from 'src/app/service/factura.service';
import { MedicamentoService } from 'src/app/service/medicamento.service';

@Component({
  selector: 'app-comprar-medicamentos',
  templateUrl: './comprar-medicamentos.component.html',
  styleUrls: ['./comprar-medicamentos.component.css']
})
export class ComprarMedicamentosComponent implements OnInit {
  cliente!: ClienteCL;
  medicamentosDisponibles: MedicamentoCL[] = []; 
  FacturaForm!:FormGroup;
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  totalCalculado: number = 0;
  constructor(private facturaService:FacturaService, 
              private clienteService:ClienteService,
              private medicamentoService:MedicamentoService, 
              private router:Router, 
              private route:ActivatedRoute,
              private fb:FormBuilder) {}

  ngOnInit(): void {
    const idCliente = Number(this.route.snapshot.params['id']);
    console.log('ID del cliente recibido:', idCliente);

    this.FacturaForm = this.fb.group({
      metodoPago: ['', Validators.required],
      medicamentos: this.fb.array([this.createMedicamentoGroup()])
    });


    this.clienteService.getCliente(idCliente).subscribe({
      next: (clienteData) => {
        this.cliente = clienteData;
        console.log('Cliente obtenido:', this.cliente);
      },
      error: (err) => {
        console.error('Error al obtener el cliente', err);
      }
    });
  
    this.medicamentoService.findAll().subscribe({
      next: (medicamentosData) => {
        this.medicamentosDisponibles = medicamentosData;
        console.log('Medicamentos disponibles:', this.medicamentosDisponibles);
      },
      error: (err) => {
        console.error('Error al obtener los medicamentos', err);
      }
    });
  }

  createMedicamentoGroup(): FormGroup {
    return this.fb.group({
      idMedicamento: ['', Validators.required],
      dosis: ['', Validators.required]
    });
  }

  get medicamentosArray(): FormArray {
    return this.FacturaForm.get('medicamentos') as FormArray;
  }

  addMedicamento(): void {
    this.medicamentosArray.push(this.createMedicamentoGroup());
  }

  removeMedicamento(index: number): void {
    if (this.medicamentosArray.length > 1) {
      this.medicamentosArray.removeAt(index);
    } else {
      this.showError('Debe haber al menos un medicamento');
    }
  }

  canGenerateFactura(): boolean {
  return this.medicamentosArray.controls.every(group => 
    group.get('idMedicamento')?.value && group.get('dosis')?.value
  );
  }

  getTotal(): number {
  const selectedIds = this.medicamentosArray.controls.map(group => group.get('idMedicamento')?.value);
  return selectedIds.reduce((acc, id) => {
    const med = this.medicamentosDisponibles.find(m => m.idMedicamento === +id);
    return acc + (med ? med.precioVenta : 0);
  }, 0);
}


medicamentosValidosSeleccionados(): boolean {
  return this.medicamentosArray.controls.every(ctrl =>
    ctrl.get('idMedicamento')?.value && ctrl.get('dosis')?.value
  );
}

Onsubmit(): void {
  if (this.FacturaForm.invalid) {
    if (!this.FacturaForm.value.metodoPago) {
      alert('Debe seleccionar un método de pago.');
    } else {
      alert('Hay campos inválidos en el formulario.');
    }
    this.showError('Complete todos los campos del formulario.');
    return;
  }

  if (!this.canGenerateFactura()) {
    alert('Debe seleccionar al menos un medicamento y especificar su dosis.');
    this.showError('Debe seleccionar al menos un medicamento y especificar su dosis.');
    return;
  }

  this.loading = true;
  this.successMessage = null;
  this.errorMessage = null;

  const formValue = this.FacturaForm.value;
  const now = new Date();

  const factura = new FacturaCL(
          0,
          now,
          this.getTotal(),
          false,
          formValue.metodoPago,
          this.cliente,
          null,
          null,
          []
        );

  const idsMedicamentos = this.medicamentosArray.controls.map(ctrl => ctrl.get('idMedicamento')?.value);

  this.facturaService.crearFacturaPorMedicamentos(this.cliente.idCliente, idsMedicamentos, factura).subscribe({
    next: (facturaCreada) => {
      this.loading = false;
      this.successMessage = 'Factura creada exitosamente';
      console.log('Factura creada:', facturaCreada);
      this.router.navigate(['/facturas/cliente', this.cliente.idCliente]);
      this.resetForm();
    },
    error: (err) => {
      console.error('Error al crear la factura', err);
      alert('Error al crear la factura. ¿Está autenticado? Verifique si ha iniciado sesión.' + err.message);
      this.showError('Error al crear la factura. Por favor, inténtelo de nuevo.');
    },
    complete: () => this.loading = false
  });
}
  
  resetForm(): void {
    this.FacturaForm.reset({
      fechaHora: new Date().toISOString().substring(0, 10),
      total: 0,
      pagada: false,
      metodoPago: '',
      cliente: this.cliente.idCliente,
      medicamentos: [] // Reiniciar el FormArray
    });
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.loading = false;
  }
}