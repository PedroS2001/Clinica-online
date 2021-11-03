import { Component, OnInit } from '@angular/core';
import { ArchivosService } from 'src/app/services/archivos.service';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private afs:FirebaseService, private auth:AuthService, private excelService:ArchivosService) { }

  tabla:string = '';

  ngOnInit(): void {
  }

  seleccionarTabla(tabla:string)
  {
    this.tabla = tabla;
  }

  agregarUsuario:boolean = false;
  btnAgregar()
  {
    this.agregarUsuario = true;
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

}
