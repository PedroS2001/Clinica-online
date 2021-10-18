import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.css']
})
export class TablaPacientesComponent implements OnInit {

  constructor(private afs:FirebaseService) {
    this.traerPacientes();
   }

  ngOnInit(): void {
  }

  arrayPacientes:any = [];
  traerPacientes()
  {
    this.afs.LeerPacientes().subscribe((pacientes) => {
      this.arrayPacientes = [];
      pacientes.forEach((item: any) => {
        this.arrayPacientes.push({
          id: item.payload.doc.id,
          data: item.payload.doc.data()
        });
      })

      setTimeout(() => {
        console.info('Pacientes', this.arrayPacientes);
      }, 1500);
      
    });
  }

}
