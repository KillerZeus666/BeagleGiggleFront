import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './veterinaria/header/header.component';
import { MascotaTableComponent } from './mascota/mascota-table/mascota-table.component';
import { MascotaDetailComponent } from './mascota/mascota-detail/mascota-detail.component';
import { MascotaFormComponent } from './mascota/mascota-form/mascota-form.component';
import { FormsModule } from '@angular/forms';
import { EmoticonPipe } from './pipe/emoticon.pipe';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { ErrorsPageComponent } from './errors/errors-page/errors-page.component';
import { FooterComponent } from './veterinaria/footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { FundacionesComponent } from './landing/fundaciones/fundaciones.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteTableComponent } from './cliente/cliente-table/cliente-table.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteDetailComponent } from './cliente/cliente-detail/cliente-detail.component';
import { VerMascotasClienteComponent } from './cliente/ver-mascotas-cliente/ver-mascotas-cliente.component';
import { LoginComponent } from './login/login.component';
import { VerCitasVeterinarioComponent } from './veterinario/ver-citas-veterinario/ver-citas-veterinario.component';
import { VeterinarioTableComponent } from './veterinario/veterinario-table/veterinario-table.component';
import { VeterinarioFormComponent } from './veterinario/veterinario-form/veterinario-form.component';
import { VeterinarioDetailComponent } from './veterinario/veterinario-detail/veterinario-detail.component';
import { ClienteBienvenidaComponent } from './cliente-bienvenida/cliente-bienvenida.component';
import { ClientePaginaPrincipalComponent } from './cliente/cliente-pagina-principal/cliente-pagina-principal.component';
import { CalcularEdadComponent } from './cliente/calcular-edad/calcular-edad.component';
import { MascotasTratamientoComponent } from './cliente/mascotas-tratamiento/mascotas-tratamiento.component';
import { TratamientoFormComponent } from './tratamiento/tratamiento-form/tratamiento-form.component';
import { TratamientoDetailComponent } from './tratamiento/tratamiento-detail/tratamiento-detail.component';
import { AdminTableComponent } from './admin/admin-table/admin-table.component';
import { NavegacionComponent } from './veterinaria/navegacion/navegacion.component';
import { BuscadorComponent } from './veterinaria/buscador/buscador.component';
import { CartasClienteComponent } from './cliente/cartas-cliente/cartas-cliente.component';
import { CartasAdministradorComponent } from './admin/cartas-administrador/cartas-administrador.component';
import { VeterinarioPageComponent } from './veterinario/veterinario-page/veterinario-page.component';
import { MedicamentoTableComponent } from './medicamento/medicamento-table/medicamento-table.component';
import { ServicioTableComponent } from './servicio/servicio-table/servicio-table.component';
import { HistorialTratamientosComponent } from './veterinario/historial-tratamientos/historial-tratamientos.component';
import { AdminDetailComponent } from './admin/admin-detail/admin-detail.component';
import { MascotasAtendidasComponent } from './veterinario/mascotas-atendidas/mascotas-atendidas.component';
import { TratamientoTableComponent } from './tratamiento/tratamiento-table/tratamiento-table.component';
import { CitaFormComponent } from './cita/cita-form/cita-form.component';
import { CitaDetailComponent } from './cita/cita-detail/cita-detail.component';
import { ServiciosComponent } from './landing/servicios/servicios.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MascotaTableComponent,
    MascotaDetailComponent,
    MascotaFormComponent,
    EmoticonPipe,
    AdminPageComponent,
    ErrorsPageComponent,
    FooterComponent,
    LandingComponent,
    FundacionesComponent,
    ClienteTableComponent,
    ClienteFormComponent,
    ClienteDetailComponent,
    VerMascotasClienteComponent,
    LoginComponent,
    VerCitasVeterinarioComponent,
    VeterinarioTableComponent,
    VeterinarioFormComponent,
    VeterinarioDetailComponent,
    ClienteBienvenidaComponent,
    ClientePaginaPrincipalComponent,
    CalcularEdadComponent,
    MascotasTratamientoComponent,
    TratamientoFormComponent,
    TratamientoDetailComponent,
    AdminTableComponent,
    NavegacionComponent,
    BuscadorComponent,
    CartasClienteComponent,
    CartasAdministradorComponent,
    VeterinarioPageComponent,
    MedicamentoTableComponent,
    ServicioTableComponent,
    HistorialTratamientosComponent,
    AdminDetailComponent,
    MascotasAtendidasComponent,
    NavegacionComponent,
    TratamientoTableComponent,
    CitaFormComponent,
    CitaDetailComponent,
    ServiciosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  

})
export class AppModule { }
