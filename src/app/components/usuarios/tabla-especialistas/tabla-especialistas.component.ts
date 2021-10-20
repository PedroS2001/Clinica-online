import { Component, IterableDiffers, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-tabla-especialistas',
  templateUrl: './tabla-especialistas.component.html',
  styleUrls: ['./tabla-especialistas.component.css']
})
export class TablaEspecialistasComponent implements OnInit {

  constructor(public afs:FirebaseService) {
   }

  ngOnInit(): void {
  }

  cambiarEstado(index:number)
  {
    if(this.afs.arrayEspecialistas[index].data.habilitado)
    {
      this.afs.arrayEspecialistas[index].data.habilitado = false;
      this.afs.ModificarEstadoEspecialista(this.afs.arrayEspecialistas[index].id, false);
    }
    else
    {
      this.afs.arrayEspecialistas[index].data.habilitado = true;
      this.afs.ModificarEstadoEspecialista(this.afs.arrayEspecialistas[index].id, true);
    }
  }



}
