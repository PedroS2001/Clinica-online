import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ArchivosService } from 'src/app/services/archivos.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.css']
})
export class TablaPacientesComponent implements OnInit {

  @Output() pacienteSeleccionado: EventEmitter<any> = new EventEmitter<any>();


  constructor(public afs:FirebaseService, private excelService:ArchivosService) {
   }

  ngOnInit(): void {
  }

  mostrar(indice:number)
  {
    this.pacienteSeleccionado.emit(this.afs.arrayPacientes[indice]);
  }


 mostrarHistoria:boolean = false;
 usuario:any;
 verHistoria(usuario:any)
 {
   console.info('usuario',usuario);
   this.mostrarHistoria = true;
   this.usuario = usuario;
 }

}
