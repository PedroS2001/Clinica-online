import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TurnospacienteComponent } from 'src/app/components/turnos/turnospaciente/turnospaciente.component';


const routes: Routes = [
  {
    path: 'misturnos',
    component: TurnospacienteComponent
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
export class PacienteModule { }
