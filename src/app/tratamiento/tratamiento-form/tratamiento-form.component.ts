import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { TratamientoCL } from 'src/app/model/tratamiento-cl';
import { TratamientoService } from 'src/app/service/tratamiento.service';
@Component({
  selector: 'app-tratamiento-form',
  templateUrl: './tratamiento-form.component.html',
  styleUrls: ['./tratamiento-form.component.css']
})
export class TratamientoFormComponent {
     tratamientoForm: FormGroup;
  loading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private tratamientoService: TratamientoService
  ) {
    this.tratamientoForm = this.fb.group({
      codigo: ['', Validators.required],
      fecha: [new Date().toISOString().substring(0, 10), Validators.required],
      idServicio: ['', Validators.required],
      idMascota: ['', Validators.required],
      idVeterinario: [null],
      detalles: ['', Validators.required],
      medicamentos: this.fb.array([this.createMedicamentoGroup()])
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
   // Crear una instancia usando solo los datos del formulario (idTratamiento = 0, valores iniciales)
    const tratamiento = new TratamientoCL(
      0,                              // idTratamiento
      formValue.codigo,              // código
      new Date(formValue.fecha),     // fecha (convertido de string a Date)
      formValue.detalles             // detalles
      // veterinario, mascota, servicio y tratamientoMedicamentos se dejan como undefined por ahora
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
        this.showSuccess('Tratamiento creado exitosamente');
        this.resetForm();
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
      fecha: new Date().toISOString().substring(0, 10),
      medicamentos: [this.createMedicamentoGroup()]
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
