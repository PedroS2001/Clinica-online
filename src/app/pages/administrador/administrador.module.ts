import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { TurnosadministradorComponent } from 'src/app/components/turnos/turnosadministrador/turnosadministrador.component';

const routes: Routes = [
  {
    path: 'turnos',
    component: TurnosadministradorComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
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
export class AdministradorModule { }
