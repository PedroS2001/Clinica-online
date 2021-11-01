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

  exportAsXLSX():void {
    let arrayDatas:any = [];
    let elementFilter:any;
    // elementFilter.push('Nombre', 'Apellido', 'Mail', 'Password', 'Edad', 'DNI');
    // arrayDatas.push(elementFilter);
    this.afs.arrayPacientes.forEach((element:any) => {

      elementFilter = [{
        nombre: element.data.nombre,
        apellido : element.data.apellido,
        mail : element.data.mail,
        password : element.data.password,
        edad: element.data.edad,
        dni: element.data.dni,
        referenciaFoto : element.data.imagen
      }];

      console.info('elementofilter', elementFilter[0]);
      arrayDatas.push(elementFilter[0]);
    });
    this.afs.arrayEspecialistas.forEach((element:any) => {

      elementFilter = [{
        nombre: element.data.nombre,
        apellido : element.data.apellido,
        mail : element.data.mail,
        password : element.data.password,
        edad: element.data.edad,
        dni: element.data.dni,
        referenciaFoto : element.data.imagen
      }];

      arrayDatas.push(elementFilter[0]);
    });
    this.afs.arrayAdministradores.forEach((element:any) => {

      elementFilter = [{
        nombre: element.data.nombre,
        apellido : element.data.apellido,
        mail : element.data.mail,
        password : element.data.password,
        edad: element.data.edad,
        dni: element.data.dni,
        referenciaFoto : element.data.imagen
      }];

      arrayDatas.push(elementFilter[0]);
    });

    this.excelService.exportAsExcelFile(arrayDatas, 'listadoUsuarios');
 }

 imprimirPdf()
 {
  //  let doc = new jspdf.jsPDF();
  let data =(<HTMLElement>document.getElementById('myDiv'));  

  html2canvas(data).then(canvas => {
    const contentDataURL = canvas.toDataURL('image/png')  
    // let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
    let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in portrait mode
    
    pdf.addImage(contentDataURL, 'PNG', 0, 0, 0, 0);  
    pdf.save('historiaclinica'+ new Date().toString() +'.pdf');   
  }); 
 }


}
