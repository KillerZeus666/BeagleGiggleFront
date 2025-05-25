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
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.css']
})
export class CitaFormComponent implements OnInit{
  @ViewChild('citaForm') citaForm!: NgForm;
  @Output() addCitaEvent = new EventEmitter<CitaCL>();

  userType: string | null = null;

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
    private citaService: CitaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  this.userType = this.authService.getUserType();
  const idCitaParam = this.route.snapshot.paramMap.get('id');
  const idCita = Number(idCitaParam);
  console.log('idCitaParam:', idCitaParam, 'idCita:', idCita);

  if (!isNaN(idCita) && idCita > 0) {
    this.modoEdicion = true;
    this.loadCita(idCita);
    console.log('Modo edición de cita');
  } else {
    this.modoEdicion = false;
    console.log('Modo creación de cita');
    // Solo cargamos veterinario asignado si es veterinario
    if (this.userType === 'Veterinario') {
      this.idVeterinario = history.state.idVeterinario;
      if (this.idVeterinario) {
        this.loadVeterinario(this.idVeterinario);
      }
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
    if(this.userType == 'Veterinario') {
      this.mascotaService.findAll().subscribe({
        next: (mascotas) => {
          this.mascotas = mascotas;
        },
        error: (err) => {
          console.error('Error loading pets:', err);
        }
      });
    } else if(this.userType == 'Cliente') {
      // Corregido el nombre para coincidir con lo enviado
      const idCliente = history.state.idCliente; // Ahora coincide con minúscula 'l'
      
      // Añade validación
      if (!idCliente) {
        console.error('ID de cliente no encontrado en history.state');
        // Opcional: intenta obtener el ID de otra fuente
        return;
      }
  
      this.mascotaService.getMascotasPorCliente(idCliente).subscribe({
        next: (mascotas) => {
          this.mascotas = mascotas;
        },
        error: (err) => {
          console.error('Error loading pets:', err);
        }
      });
    } 
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
    console.log(this.modoEdicion ? 'Editando cita' : 'Creando cita');
    // Validate the form
    const validation = this.Formcita.validate();
    if (!validation.isValid) {
      console.warn('Errores de validación:', validation.errors);
      this.errors = validation.errors;
      alert('Errores de validación: ' + validation.errors.join(', '));
      this.errors = validation.errors;
      return;
    }

    // Ensure fechaHora is properly set
    if (!(this.Formcita.fechaHora instanceof Date)) {
      this.Formcita.fechaHora = new Date(this.Formcita.fechaHora);
    }

    if (this.userType === 'Cliente' && !this.Formcita.veterinario?.idVeterinario) {
      this.errors = ['Debe seleccionar un veterinario'];
      return;
    }

    if (this.modoEdicion) {
      console.log('Modo edición');
      this.updateCita();
    } else {
      console.log('Modo creación');
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
    console.log('Enviando cita:', this.Formcita); // <-- Añade esto
    this.citaService.crearCita(this.Formcita).subscribe({
      next: () => {
        window.history.back();
        alert('Cita creada correctamente');
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
