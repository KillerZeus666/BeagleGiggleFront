import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
