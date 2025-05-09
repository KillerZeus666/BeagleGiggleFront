import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { MascotaTableComponent } from './mascota/mascota-table/mascota-table.component';
import { ErrorsPageComponent } from './errors/errors-page/errors-page.component';
import { MascotaDetailComponent } from './mascota/mascota-detail/mascota-detail.component';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { MascotaFormComponent } from './mascota/mascota-form/mascota-form.component';
import { ClienteTableComponent } from './cliente/cliente-table/cliente-table.component';
import { ClienteDetailComponent } from './cliente/cliente-detail/cliente-detail.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { VerMascotasClienteComponent } from './cliente/ver-mascotas-cliente/ver-mascotas-cliente.component';
import { LoginComponent } from './login/login.component';
import { ClientePaginaPrincipalComponent } from './cliente/cliente-pagina-principal/cliente-pagina-principal.component';
import { VeterinarioTableComponent } from './veterinario/veterinario-table/veterinario-table.component';
import { VerCitasVeterinarioComponent } from './veterinario/ver-citas-veterinario/ver-citas-veterinario.component';
import { MascotasTratamientoComponent } from './cliente/mascotas-tratamiento/mascotas-tratamiento.component';
import { TratamientoFormComponent } from './tratamiento/tratamiento-form/tratamiento-form.component';
import { AdminTableComponent } from './admin/admin-table/admin-table.component';
import { NavegacionComponent } from './veterinaria/navegacion/navegacion.component';
import { VeterinarioDetailComponent } from './veterinario/veterinario-detail/veterinario-detail.component';
import { VeterinarioPageComponent } from './veterinario/veterinario-page/veterinario-page.component';
import { MedicamentoTableComponent } from './medicamento/medicamento-table/medicamento-table.component';
import { ServicioTableComponent } from './servicio/servicio-table/servicio-table.component';
import { HistorialTratamientosComponent } from './veterinario/historial-tratamientos/historial-tratamientos.component';
import { AdminDetailComponent } from './admin/admin-detail/admin-detail.component';
import { TratamientoTableComponent } from './tratamiento/tratamiento-table/tratamiento-table.component';
import { MascotasAtendidasComponent } from './veterinario/mascotas-atendidas/mascotas-atendidas.component';
import { TratamientoDetailComponent } from './tratamiento/tratamiento-detail/tratamiento-detail.component';
import { VeterinarioFormComponent } from './veterinario/veterinario-form/veterinario-form.component';
import { CitaDetailComponent } from './cita/cita-detail/cita-detail.component';
import { CitaFormComponent } from './cita/cita-form/cita-form.component';
import { ServiciosComponent } from './landing/servicios/servicios.component';






const routes: Routes = [
  //Correlacionar comportamiento con una URL
  {path: 'admin', component: AdminPageComponent},
  {path: 'cliente', component: ClientePaginaPrincipalComponent },
  {path: 'home', component: LandingComponent},
  {path: 'mascotas', component: MascotaTableComponent},
  {path: 'detalles-mascota/:id', component: MascotaDetailComponent },
  {path: 'crear-mascota', component:MascotaFormComponent},
  {path: 'editar-mascota/:id', component:MascotaFormComponent},
  {path: 'clientes',component:ClienteTableComponent},
  {path: 'detalles-cliente/:id', component:ClienteDetailComponent},
  {path: 'crear-cliente', component:ClienteFormComponent},
  {path: 'editar-cliente/:id', component:ClienteFormComponent},
  {path: 'mascotas-cliente/:id', component:VerMascotasClienteComponent},
  {path: 'mascotas-tratamiento/:id', component:MascotasTratamientoComponent},
  {path: 'citas-veterinario/:id', component:VerCitasVeterinarioComponent},
  {path: 'veterinarios', component:VeterinarioTableComponent},
  {path: 'crear-tratamiento', component:TratamientoFormComponent},
  {path: 'inicio-sesion', component: LoginComponent },
  {path: 'tabla', component: AdminTableComponent },
  {path: 'navigation', component: NavegacionComponent },
  {path: 'veterinario', component: VeterinarioPageComponent },
  {path: 'detalles-veterinario/:id', component: VeterinarioDetailComponent},
  {path: 'medicamentos', component: MedicamentoTableComponent },
  {path: 'servicios', component: ServicioTableComponent},
  {path: 'historial-tratamientos/:id', component:HistorialTratamientosComponent},
  {path: 'detalles-admin/:id', component: AdminDetailComponent},
  {path: 'mascotas-atendidas/:id', component:MascotasAtendidasComponent},
  {path: 'tratamiento/mascota/:id', component: TratamientoTableComponent},
  {path: 'detalles-tratamiento/:id', component:TratamientoDetailComponent},
  {path: 'crear-veterinario', component:VeterinarioFormComponent},
  {path: 'editar-veterinario/:id', component:VeterinarioFormComponent},
  {path: 'agendar-cita',component:CitaFormComponent},
  {path: 'editar-cita/:id', component:CitaFormComponent},
  {path: 'servicios-clinicos', component: ServiciosComponent},
  {path: 'detalles-cita/:id', component:CitaDetailComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', component: ErrorsPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
