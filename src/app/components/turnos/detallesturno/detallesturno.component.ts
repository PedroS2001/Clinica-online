import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

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


  
  //#region ACCIONES

  cancelarTurno(item:any)
  {
    Swal.fire({
      input: 'text',
      title: 'Cancelar',
      text: '¿Por que quiere cancelar el turno?',
      icon: 'error',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Enviar'
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await this.afs.updateEstado(item.id, 'cancelado');
        await this.afs.updateComentario(item.id, result.value).then(()=> {
          this.cargarTurnos();
        });

        Swal.fire({
          title: 'Se cancelo el turno',
          text:  result.value ,
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }


  verComentario(item:any)
  {
    console.info('item',item);
    Swal.fire({
      title: 'Comentario',
      icon: 'info',
      text: item.data.comentario,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Aceptar'
    });
  }

  //#endregion





}
