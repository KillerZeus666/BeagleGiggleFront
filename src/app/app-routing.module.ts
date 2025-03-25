import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { MascotaTableComponent } from './mascota/mascota-table/mascota-table.component';
import { ErrorsPageComponent } from './errors/errors-page/errors-page.component';
import { MascotaDetailComponent } from './mascota/mascota-detail/mascota-detail.component';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { MascotaFormComponent } from './mascota/mascota-form/mascota-form.component';


const routes: Routes = [
  //Correlacionar comportamiento con una URL
  {path: 'admin', component: AdminPageComponent},
  {path: 'home', component: LandingComponent},
  {path: 'mascotas', component: MascotaTableComponent},
  {path: 'detalles-mascota/:id', component: MascotaDetailComponent },
  {path: 'crear-mascota', component:MascotaFormComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', component: ErrorsPageComponent}

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
