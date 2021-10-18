import { Component, IterableDiffers, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-tabla-especialistas',
  templateUrl: './tabla-especialistas.component.html',
  styleUrls: ['./tabla-especialistas.component.css']
})
export class TablaEspecialistasComponent implements OnInit {

  constructor(private afs:FirebaseService) {
    this.traerEspecialistas();
   }

  ngOnInit(): void {
  }

  cambiarEstado(index:number)
  {
    if(this.arrayEspecialistas[index].data.habilitado)
    {
      this.arrayEspecialistas[index].data.habilitado = false;
      this.afs.ModificarEstadoEspecialista(this.arrayEspecialistas[index].id, false);
    }
    else
    {
      this.arrayEspecialistas[index].data.habilitado = true;
      this.afs.ModificarEstadoEspecialista(this.arrayEspecialistas[index].id, true);
    }
  }

  
  arrayEspecialistas:any = [];
  traerEspecialistas()
  {
    this.afs.LeerEspecialistas().subscribe((especialistas) => {
      this.arrayEspecialistas = [];
      especialistas.forEach((item: any) => {
        this.arrayEspecialistas.push({
          id: item.payload.doc.id,
          data: item.payload.doc.data()
        });
      })

      setTimeout(() => {
        console.info('Especialistas', this.arrayEspecialistas);
      }, 1500);
      
    });
  }


}
