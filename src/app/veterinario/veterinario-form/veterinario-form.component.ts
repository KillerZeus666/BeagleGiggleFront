import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VeterinarioCL } from 'src/app/model/veterinario-cl';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-veterinario-form',
  templateUrl: './veterinario-form.component.html',
  styleUrls: ['./veterinario-form.component.css']
})
export class VeterinarioFormComponent implements OnInit {
  @ViewChild('veterinarioForm') veterinarioForm!: NgForm;
  FormVeterinario: VeterinarioCL = new VeterinarioCL();
  confirmPassword: string = '';
  editMode = false;
  sedes = ['Los Pinos', 'Patitas Felices', 'Huellas'];

  constructor(
    private veterinarioService: VeterinarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.veterinarioService.obtenerVeterinarioPorId(+id).subscribe(veterinario => {
        if (veterinario) {
          this.FormVeterinario = veterinario;
          this.confirmPassword = veterinario.contrasena;
        }
      });
    }
  }

  guardarVeterinario() {
    this.markAllAsTouched();

    if (this.veterinarioForm.valid) {
      if (this.FormVeterinario.contrasena !== this.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      if (this.editMode) {
        this.veterinarioService.actualizarVeterinario(this.FormVeterinario.idVeterinario, this.FormVeterinario)
          .subscribe(() => this.router.navigate(['/veterinarios']));
      } else {
        this.veterinarioService.crearVeterinario(this.FormVeterinario, this.confirmPassword)
          .subscribe(() => this.router.navigate(['/veterinarios']));
      }
    }
  }

  markAllAsTouched() {
    if (this.veterinarioForm?.controls) {
      Object.values(this.veterinarioForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}