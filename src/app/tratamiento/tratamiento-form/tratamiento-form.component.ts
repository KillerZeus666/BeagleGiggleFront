import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { MedicamentoCL } from 'src/app/model/medicamento-cl';
import { ServicioCL } from 'src/app/model/servicio-cl';
import { TratamientoCL } from 'src/app/model/tratamiento-cl';
import { MascotaService } from 'src/app/service/mascota.service';
import { MedicamentoService } from 'src/app/service/medicamento.service';
import { ServicioService } from 'src/app/service/servicio.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-tratamiento-form',
  templateUrl: './tratamiento-form.component.html',
  styleUrls: ['./tratamiento-form.component.css']
})
export class TratamientoFormComponent implements OnInit{
  tratamientoForm!: FormGroup;
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  servicios: ServicioCL[] = []; 
  mascotas: MascotaCL[] = [];  
  medicamentosDisponibles: MedicamentoCL[] = []; 

  idVeterinario: number=0;
  constructor(
    private fb: FormBuilder,
    private tratamientoService: TratamientoService,
    private servicioService: ServicioService,
    private mascotaService: MascotaService,
    private medicamentoService: MedicamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = history.state?.id || 0;
    console.log('idVeterinario recibido:', id); 
    this.idVeterinario = id;

    this.tratamientoForm = this.fb.group({
      //codigo: ['', Validators.required],
      fecha: [new Date().toISOString().substring(0, 10), Validators.required],
      idServicio: ['', Validators.required],
      idMascota: ['', Validators.required],
      idVeterinario: [this.idVeterinario],
      detalles: ['', Validators.required],
      medicamentos: this.fb.array([this.createMedicamentoGroup()])
    });

    console.log(this.idVeterinario);

      this.servicioService.findAll().subscribe({
        next: (serviciodata) => {
          this.servicios=serviciodata;
        },
        error: (err) =>{
          console.error('Error al obtener los servicios',err);
        }
      });

      this.mascotaService.findAll().subscribe({
        next: (mascotadata) =>{
          this.mascotas=mascotadata;
        },
        error: (err) =>{
          console.error('Error al obtener las mascotas',err)
        }
      });

      this.medicamentoService.findAll().subscribe({
        next: (medicamentodata) =>{
          this.medicamentosDisponibles = medicamentodata
        },
        error: (err) =>{
          console.error('Error al obtener los medicamentos',err);
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
    return this.tratamientoForm.get('medicamentos') as FormArray;
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

  onSubmit(): void {
    if (this.tratamientoForm.invalid) {
      this.showError('Por favor complete todos los campos requeridos');
      return;
    }

    this.loading = true;
    this.successMessage = null;
    this.errorMessage = null;

    const formValue = this.tratamientoForm.value;
    const tratamiento = new TratamientoCL(
      0,
      formValue.codigo,
      new Date(formValue.fecha),
      formValue.detalles
    );

    const idsMedicamentos = formValue.medicamentos.map((m: any) => m.idMedicamento);

    this.tratamientoService.crearTratamiento(
      tratamiento,
      formValue.idMascota,
      formValue.idServicio,
      formValue.idVeterinario,
      idsMedicamentos
    ).subscribe({
      next: () => {
        this.resetForm();
        this.router.navigate(['/historial-tratamientos', this.idVeterinario]);
      },
      error: (err) => {
        this.showError('Error al crear el tratamiento: ' + err.message);
        this.loading = false;
      },
      complete: () => this.loading = false
    });
  }

  resetForm(): void {
    this.tratamientoForm.reset({
      codigo: '',
      fecha: new Date().toISOString().substring(0, 10),
      idServicio: '',
      idMascota: '',
      idVeterinario: this.idVeterinario,
      detalles: '',
    });
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => this.successMessage = null, 5000);
  }

  private showError(message: string): void {
    this.errorMessage = message;
    this.loading = false;
  }
}
