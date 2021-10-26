import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.css']
})
export class TablaPacientesComponent implements OnInit {

  @Output() pacienteSeleccionado: EventEmitter<any> = new EventEmitter<any>();


  constructor(public afs:FirebaseService) {
   }

  ngOnInit(): void {
  }

  mostrar(indice:number)
  {
    this.pacienteSeleccionado.emit(this.afs.arrayPacientes[indice]);
  }

}
