import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-detallesturno',
  templateUrl: './detallesturno.component.html',
  styleUrls: ['./detallesturno.component.css']
})
export class DetallesturnoComponent implements OnInit {

  turnosDelPaciente:any = [];
  constructor(private afs:FirebaseService, private auth:AuthService) { }

  ngOnInit(): void {
  }

  cargarTurnos()
  {
    let listadoTurnos = this.afs.listaTurnos;
    this.turnosDelPaciente = [];

    listadoTurnos.forEach( (item:any) => {
      console.log(item);
      if(item.data.dniPaciente == this.auth.currentUser.dni)
      {
        this.turnosDelPaciente.push(item);
      }
    });
  }

  filtrarPor(especialista:any)
  {
    let arrayAux:any = [];
    this.turnosDelPaciente.forEach( (element:any) => {
      console.log(element);
      if(element.data.especialista == especialista )
      {
        arrayAux.push(element);
      }
    });

    this.turnosDelPaciente = arrayAux;

  }

}
