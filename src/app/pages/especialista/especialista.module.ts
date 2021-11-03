import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TurnosespecialistaComponent } from 'src/app/components/turnos/turnosespecialista/turnosespecialista.component';
import { SeccionpacientesComponent } from '../seccionpacientes/seccionpacientes.component';

const routes: Routes = [
  {
    path: 'misturnos',
    component: TurnosespecialistaComponent
  },
  {
    path: 'pacientes',
    component: SeccionpacientesComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EspecialistaModule { }
