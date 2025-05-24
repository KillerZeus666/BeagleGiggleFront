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
import { FacturaTableComponent } from './factura/factura-table/factura-table.component';
import { QuienesSomosComponent } from './landing/quienes-somos/quienes-somos.component';
import { ClientesDestacadosComponent } from './landing/clientes-destacados/clientes-destacados.component';
import { LoginClienteComponent } from './login/login-cliente/login-cliente.component';
import { LoginVeterinarioComponent } from './login/login-veterinario/login-veterinario.component';
import { BeagleMatchComponent } from './landing/beagle-match/beagle-match.component';
import { MatchPageComponent } from './landing/match-page/match-page.component';
import { CalcularEdadComponent } from './cliente/calcular-edad/calcular-edad.component';
import { BlogComponent } from './veterinaria/blog/blog.component';
import { MostrarArticuloComponent } from './veterinaria/blog/mostrar-articulo/mostrar-articulo.component';
import { PlaylistComponent } from './veterinaria/playlist/playlist.component';
import { roleGuard } from './guards/role.guard';
import { TestSaludMascotaComponent } from './mascota/test-salud-mascota/test-salud-mascota.component';
import { EdadMascotaComponent } from './mascota/edad-mascota/edad-mascota.component';
import { RuletaPremiosComponent } from './veterinaria/ruleta-premios/ruleta-premios.component';
import { CumpleaniosComponent } from './veterinaria/cumpleanios/cumpleanios.component';

const routes: Routes = [
  //Correlacionar comportamiento con una URL
  {path: 'admin', component: AdminPageComponent, canActivate: [roleGuard], data: { roles: ['Admin'] }},
  {path: 'cliente', component: ClientePaginaPrincipalComponent, canActivate: [roleGuard], data: { roles: ['Cliente'] }},
  {path: 'home', component: LandingComponent},
  {path: 'mascotas', component: MascotaTableComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario', 'Cliente'] }},
  {path: 'detalles-mascota/:id', component: MascotaDetailComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario', 'Cliente'] }},
  {path: 'crear-mascota', component:MascotaFormComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario'] }},
  {path: 'editar-mascota/:id', component:MascotaFormComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario'] }},
  {path: 'clientes',component:ClienteTableComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario'] }},
  {path: 'detalles-cliente/:id', component:ClienteDetailComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario', 'Cliente'] }},
  {path: 'crear-cliente', component:ClienteFormComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario'] }},
  {path: 'editar-cliente/:id', component:ClienteFormComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario'] }},
  {path: 'mascotas-cliente/:id', component:VerMascotasClienteComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario', 'Cliente'] }},
  {path: 'mascotas-tratamiento/:id', component:MascotasTratamientoComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'VETERINARIO', 'Cliente'] }},
  {path: 'citas/:id', component:VerCitasVeterinarioComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario', 'Cliente'] }},
  {path: 'veterinarios', component:VeterinarioTableComponent, canActivate: [roleGuard], data: { roles: ['Admin'] }},
  {path: 'crear-tratamiento', component:TratamientoFormComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario'] }},
  {path: 'inicio-sesion', component: LoginComponent},
  {path: 'tabla', component: AdminTableComponent },
  {path: 'navigation', component: NavegacionComponent},
  {path: 'veterinario', component: VeterinarioPageComponent, canActivate: [roleGuard], data: { roles: ['Veterinario'] }},
  {path: 'detalles-veterinario/:id', component: VeterinarioDetailComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario'] }},
  {path: 'medicamentos', component: MedicamentoTableComponent,canActivate: [roleGuard], data: { roles: ['Admin'] }},
  {path: 'servicios', component: ServicioTableComponent},
  {path: 'historial-tratamientos/:id', component:HistorialTratamientosComponent},
  {path: 'detalles-admin/:id', component: AdminDetailComponent, canActivate: [roleGuard], data: { roles: ['Admin'] }},
  {path: 'mascotas-atendidas/:id', component:MascotasAtendidasComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario'] }},
  {path: 'tratamiento', component: TratamientoTableComponent,canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario', 'Cliente'] }}, 
  {path: 'tratamiento/mascota/:id', component: TratamientoTableComponent},
  {path: 'detalles-tratamiento/:id', component:TratamientoDetailComponent, canActivate: [roleGuard], data: { roles: ['Admin'] }},
  {path: 'crear-veterinario', component:VeterinarioFormComponent, canActivate: [roleGuard], data: { roles: ['Admin'] }},
  {path: 'editar-veterinario/:id', component:VeterinarioFormComponent, canActivate: [roleGuard], data: { roles: ['Admin'] }},
  {path: 'agendar-cita',component:CitaFormComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario', 'Cliente'] }},
  {path: 'editar-cita/:id', component:CitaFormComponent,canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario', 'Cliente'] }},
  {path: 'servicios-clinicos', component: ServiciosComponent},
  {path: 'detalles-cita/:id', component:CitaDetailComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario', 'Cliente'] }},
  {path: 'facturas/cliente/:id',component:FacturaTableComponent, canActivate: [roleGuard], data: { roles: ['Admin', 'Veterinario', 'Cliente'] }},
  {path: 'quienes-somos', component: QuienesSomosComponent},
  {path: 'clientes-destacados', component: ClientesDestacadosComponent},
  {path: 'beagle-match', component: BeagleMatchComponent},
  {path: 'match-page', component: MatchPageComponent},
  {path : 'calcular-edad', component: CalcularEdadComponent},
  {path: 'test-salud-mascota', component: TestSaludMascotaComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'articulo/:id', component: MostrarArticuloComponent },
  {path: 'playlist', component: PlaylistComponent},
  {path: 'edad-humana-mascota', component: EdadMascotaComponent},
  {path: 'cumpleanios-mascota', component: CumpleaniosComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', component: ErrorsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
