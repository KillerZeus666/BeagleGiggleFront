import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './veterinaria/header/header.component';
import { MascotaTableComponent } from './mascota/mascota-table/mascota-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MascotaTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
