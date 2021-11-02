import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TurnosadministradorComponent } from './components/turnos/turnosadministrador/turnosadministrador.component';
import { TurnosespecialistaComponent } from './components/turnos/turnosespecialista/turnosespecialista.component';
import { TurnospacienteComponent } from './components/turnos/turnospaciente/turnospaciente.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { MiperfilComponent } from './pages/miperfil/miperfil.component';
import { RegisterComponent } from './pages/register/register.component';
import { SeccionpacientesComponent } from './pages/seccionpacientes/seccionpacientes.component';
import { SolicitarturnovdosComponent } from './pages/solicitarturnovdos/solicitarturnovdos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent },
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'solicitarturno', component: SolicitarturnovdosComponent },
  { path: 'miperfil', component: MiperfilComponent},
  
  { path: 'paciente', loadChildren: () => import('./pages/paciente/paciente.module').then(m => m.PacienteModule) },
  { path: 'administrador', loadChildren: () => import('./pages/administrador/administrador.module').then(m => m.AdministradorModule) },
  { path: 'especialista', loadChildren: () => import('./pages/especialista/especialista.module').then(m => m.EspecialistaModule) },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
