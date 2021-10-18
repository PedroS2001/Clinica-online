import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-tabla-administradores',
  templateUrl: './tabla-administradores.component.html',
  styleUrls: ['./tabla-administradores.component.css']
})
export class TablaAdministradoresComponent implements OnInit {

  constructor(private afs:FirebaseService) {
    this.traerAdministradores();
   }

  ngOnInit(): void {
  }

  arrayAdministradores:any = [];
  traerAdministradores()
  {
    this.afs.LeerAdministradores().subscribe((administrador) => {
      this.arrayAdministradores = [];
      administrador.forEach((item: any) => {
        this.arrayAdministradores.push({
          id: item.payload.doc.id,
          data: item.payload.doc.data()
        });
      })

      setTimeout(() => {
        console.info('Administradores', this.arrayAdministradores);
      }, 1500);
      
    });
  }

}
