import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { MascotaTableComponent } from './mascota/mascota-table/mascota-table.component';
import { ErrorsPageComponent } from './errors/errors-page/errors-page.component';
import { MascotaDetailComponent } from './mascota/mascota-detail/mascota-detail.component';


const routes: Routes = [
  //Correlacionar comportamiento con una URL
  {path: 'admin', component: AdminPageComponent},
  {path: 'home', component: MascotaTableComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', component: ErrorsPageComponent},
  { path: 'detalles-mascota/:id', component: MascotaDetailComponent }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
