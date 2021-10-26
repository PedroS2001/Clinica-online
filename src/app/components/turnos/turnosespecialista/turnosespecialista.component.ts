import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-turnosespecialista',
  templateUrl: './turnosespecialista.component.html',
  styleUrls: ['./turnosespecialista.component.css']
})
export class TurnosespecialistaComponent implements OnInit {

  turnosDelEspecialista:any = [];
  constructor(private afs:FirebaseService, private auth:AuthService) { }

  ngOnInit(): void {
  }

  cargarTurnos()
  {
    let listadoTurnos = this.afs.listaTurnos;
    this.turnosDelEspecialista = [];

    listadoTurnos.forEach( (item:any) => {
      console.log(item);
      if(item.data.dniEspecialista == this.auth.currentUser.dni)
      {
        this.turnosDelEspecialista.push(item);
      }
    });
  }

  filtrarPor(paciente:any)
  {
    let arrayAux:any = [];
    this.turnosDelEspecialista.forEach( (element:any) => {
      console.log(element);
      if(element.data.paciente == paciente )
      {
        arrayAux.push(element);
      }
    });

    this.turnosDelEspecialista = arrayAux;

  }

}
