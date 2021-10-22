import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TurnosespecialistaComponent } from './components/turnos/turnosespecialista/turnosespecialista.component';
import { TurnospacienteComponent } from './components/turnos/turnospaciente/turnospaciente.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

const routes: Routes = [
  { path: '', component: BienvenidaComponent },
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'paciente/misturnos', component: TurnospacienteComponent },
  { path: 'especialista/misturnos', component: TurnosespecialistaComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
