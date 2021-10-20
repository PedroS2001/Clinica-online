import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-tabla-administradores',
  templateUrl: './tabla-administradores.component.html',
  styleUrls: ['./tabla-administradores.component.css']
})
export class TablaAdministradoresComponent implements OnInit {

  constructor(public afs:FirebaseService) {
   }

  ngOnInit(): void {
  }

}
