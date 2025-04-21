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



const routes: Routes = [
  //Correlacionar comportamiento con una URL
  {path: 'admin', component: AdminPageComponent},
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
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'inicio-sesion', component: LoginComponent },
  {path: '**', component: ErrorsPageComponent}

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
