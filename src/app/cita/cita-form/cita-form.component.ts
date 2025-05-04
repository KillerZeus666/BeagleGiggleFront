import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { ServicioService } from 'src/app/service/servicio.service';
import { CitaService } from 'src/app/service/cita.service';
import { CitaCL } from 'src/app/model/cita-cl';
import { MascotaCL } from 'src/app/model/mascota-cl';
import { ServicioCL } from 'src/app/model/servicio-cl';
import { VeterinarioCL } from 'src/app/model/veterinario-cl';

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.css']
})
export class CitaFormComponent implements OnInit{
  @ViewChild('citaForm') citaForm!: NgForm;
  @Output() addCitaEvent = new EventEmitter<CitaCL>();

  Formcita: CitaCL = new CitaCL(
    undefined,
    new Date(),
    '',
    new MascotaCL(),
    new VeterinarioCL(),
    new ServicioCL(),
    'AGENDADA'
  );

  modoEdicion = false;
  errors: string[] = [];
  
  // Lists for dropdowns
  mascotas: MascotaCL[] = [];
  servicios: ServicioCL[] = [];
  veterinarios: VeterinarioCL[] = [];
  sedesDisponibles: string[] = ['Sede Norte', 'Sede Sur', 'Sede Centro'];
  
  // Assigned vet (for new appointment)
  idVeterinario?: number;
  veterinarioAsignado?: VeterinarioCL;

  estadosCita = ['AGENDADA', 'CONFIRMADA', 'CANCELADA', 'COMPLETADA'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mascotaService: MascotaService,
    private veterinarioService: VeterinarioService,
    private servicioService: ServicioService,
    private citaService: CitaService
  ) {}

  ngOnInit(): void {
    const idCita = Number(this.route.snapshot.paramMap.get('id'));
    
    if (idCita) {
      this.modoEdicion = true;
      this.loadCita(idCita);
    } else {
      this.idVeterinario = history.state.idVeterinario;
      if (this.idVeterinario) {
        this.loadVeterinario(this.idVeterinario);
      }
    }
    
    this.loadMascotas();
    this.loadServicios();
    this.loadVeterinarios();
  }

  private loadCita(idCita: number): void {
    this.citaService.obtenerCitaPorId(idCita).subscribe({
      next: (cita) => {
        this.Formcita = CitaCL.fromBackendData(cita);
      },
      error: (err) => {
        console.error('Error loading appointment:', err);
        this.errors = ['Error loading appointment data'];
      }
    });
  }

  private loadVeterinario(idVet: number): void {
    this.veterinarioService.obtenerVeterinarioPorId(idVet).subscribe({
      next: (veterinario) => {
        this.veterinarioAsignado = veterinario;
        this.Formcita.veterinario = veterinario;
      },
      error: (err) => {
        console.error('Error loading veterinarian:', err);
      }
    });
  }

  private loadMascotas(): void {
    this.mascotaService.findAll().subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
      },
      error: (err) => {
        console.error('Error loading pets:', err);
      }
    });
  }

  private loadServicios(): void {
    this.servicioService.findAll().subscribe({
      next: (servicios) => {
        this.servicios = servicios;
      },
      error: (err) => {
        console.error('Error loading services:', err);
      }
    });
  }

  private loadVeterinarios(): void {
    this.veterinarioService.obtenerTodosVeterinarios().subscribe({
      next: (veterinarios) => {
        this.veterinarios = veterinarios;
      },
      error: (err) => {
        console.error('Error loading veterinarians:', err);
      }
    }); 
  }

  private markAllAsTouched(): void {
    if (this.citaForm && this.citaForm.controls) {
      Object.keys(this.citaForm.controls).forEach((field) => {
        const control = this.citaForm.controls[field];
        control.markAsTouched();
      });
    }
  }

  guardarCita(): void {
    this.markAllAsTouched();
    
    // Validate the form
    const validation = this.Formcita.validate();
    if (!validation.isValid) {
      this.errors = validation.errors;
      return;
    }

    // Ensure fechaHora is properly set
    if (!(this.Formcita.fechaHora instanceof Date)) {
      this.Formcita.fechaHora = new Date(this.Formcita.fechaHora);
    }

    if (this.modoEdicion) {
      this.updateCita();
    } else {
      this.createCita();
    }
  }

  private updateCita(): void {
    if (!this.Formcita.idCita) {
      this.errors = ['Invalid appointment ID'];
      return;
    }

    this.citaService.actualizarCita(this.Formcita.idCita, this.Formcita).subscribe({
      next: () => {
        window.history.back();
      },
      error: (err) => {
        console.error('Error updating appointment:', err);
        this.errors = ['Error updating appointment'];
      }
    });
  }

  private createCita(): void {
    this.citaService.crearCita(this.Formcita.toBackendFormat()).subscribe({
      next: (response) => {
        window.history.back();
      },
      error: (err) => {
        console.error('Error creating appointment:', err);
        this.errors = ['Error creating appointment'];
      }
    });
  }

 get fechaHoraFormatted(): string {
    if (!this.Formcita.fechaHora) return '';
    
    const date = this.Formcita.fechaHora instanceof Date 
      ? this.Formcita.fechaHora 
      : new Date(this.Formcita.fechaHora);
      
    // Format: "YYYY-MM-DDTHH:mm"
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
      .toISOString()
      .slice(0, 16);
}
  
set fechaHoraFormatted(value: string) {
    if (value) {
      this.Formcita.fechaHora = new Date(value);
    }
}

}
