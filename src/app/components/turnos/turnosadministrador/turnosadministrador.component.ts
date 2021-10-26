import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-turnosadministrador',
  templateUrl: './turnosadministrador.component.html',
  styleUrls: ['./turnosadministrador.component.css']
})
export class TurnosadministradorComponent implements OnInit {

  constructor(private afs:FirebaseService) { }

  listadoTurnos:any;
  ngOnInit(): void {
    this.listadoTurnos = this.afs.listaTurnos;
  }

}
