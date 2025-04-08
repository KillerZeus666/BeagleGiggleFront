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
    FundacionesComponent
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
