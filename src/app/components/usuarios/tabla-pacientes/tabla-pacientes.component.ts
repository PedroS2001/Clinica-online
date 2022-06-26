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


  constructor(public afs: FirebaseService, private excelService: ArchivosService) {
  }

  ngOnInit(): void {
  }

  mostrar(indice: number) {
    this.pacienteSeleccionado.emit(this.afs.arrayPacientes[indice]);
  }


  usuario: any;
  mostrarHistoria: boolean = false;
  turnosDelPaciente: any;

  mostrarHC(paciente: any) {
    console.info('paciente', paciente);
    this.turnosDelPaciente = this.afs.listaTurnos.filter((unTurno: any) => unTurno.data.dniPaciente == paciente.data.dni);
    this.exportAsXLSX(paciente);
  }


  exportAsXLSX(paciente: any): void {
    let arrayDatas: any = [];
    let elementFilter: any;

    this.turnosDelPaciente.forEach((turno: any) => {

      elementFilter = [{
        fecha: turno.data.fecha,
        horario: turno.data.horario + 'hs',
        especialidad: turno.data.especialidad,
        especialista: turno.data.especialista

      }];

      console.info('elementofilter', elementFilter[0]);
      arrayDatas.push(elementFilter[0]);
    });

    this.excelService.exportAsExcelFile(arrayDatas, 'turnosTomadosPor:' + paciente.data.apellido);
  }

}
