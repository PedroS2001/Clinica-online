import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turnosespecialista',
  templateUrl: './turnosespecialista.component.html',
  styleUrls: ['./turnosespecialista.component.css']
})
export class TurnosespecialistaComponent implements OnInit {

  turnosDelEspecialista:any = [];
  turnosSinFiltrar:any;

  constructor(public afs:FirebaseService, private auth:AuthService) { }

  ngOnInit(): void {
    this.cargarTurnos();
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
    
    this.turnosSinFiltrar = this.turnosDelEspecialista;
  }

  filtrarPor(dni:any)
  {
    this.turnosDelEspecialista = this.turnosSinFiltrar;

    let arrayAux:any = [];
    this.turnosDelEspecialista.forEach( (element:any) => {
      console.log(element);
      if(element.data.paciente == dni )
      {
        arrayAux.push(element);
      }
    });

    this.turnosDelEspecialista = arrayAux;
  }

  filtrarPorEspecialidad(item:any)
  {
    this.turnosDelEspecialista = this.turnosSinFiltrar;

    let arrayAux:any = [];
    this.turnosDelEspecialista.forEach( (element:any) => {
      console.log(element);
      if(element.data.especialidad == item )
      {
        arrayAux.push(element);
      }
    });

    this.turnosDelEspecialista = arrayAux;

  }


  pacientesFiltrados:any;
  paraFiltrar()
  {
    this.turnosDelEspecialista = this.turnosSinFiltrar;
    this.pacientesFiltrados = [];
    let data:any = [];
    this.turnosDelEspecialista.forEach( (element:any) => {
      data.push(element.data.paciente);
    });

    this.pacientesFiltrados = data.filter((item:any,index:any)=>{
      return data.indexOf(item) === index;
    })

    console.log(this.pacientesFiltrados)
  }

  especialidadesFiltradas:any;
  paraFiltrarEspecialidades()
  {
    this.turnosDelEspecialista = this.turnosSinFiltrar;
    this.especialidadesFiltradas = [];
    let data:any = [];
    this.turnosDelEspecialista.forEach( (element:any) => {
      data.push(element.data.especialidad);
    });

    this.especialidadesFiltradas = data.filter((item:any,index:any)=>{
      return data.indexOf(item) === index;
    })

    console.log(this.especialidadesFiltradas)
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
        await this.afs.updateComentario(item.id, result.value, this.auth.currentUser.perfil).then(()=> {
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

  rechazarTurno(item:any)
  {
    Swal.fire({
      input: 'text',
      title: 'Rechazar',
      text: '¿Por que quiere rechazar el turno?',
      icon: 'error',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Enviar'
    })
    .then(async (result) => {
      if (result.isConfirmed) {

        await this.afs.updateEstado(item.id, 'rechazado');
        await this.afs.updateComentario(item.id, result.value, this.auth.currentUser.perfil).then(()=>{
          this.cargarTurnos();
        });

        Swal.fire({
          title: 'Se rechazo el turno',
          text:  result.value ,
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

  async aceptarTurno(item:any)
  {
    Swal.fire({
      icon: 'success',
      text: 'Se acepto el turno',
      // showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Aceptar'
    });

    this.afs.updateEstado(item.id, 'aceptado').then( () => {
      this.cargarTurnos();
    });

  }

  finalizarTurno(item:any)
  {
    Swal.fire({
      input: 'text',
      title: 'Finalizar',
      text: 'Por favor deje una reseña del turno y el diagnostico realizado',
      icon: 'info',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Enviar'
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await this.afs.updateEstado(item.id, 'realizado');
        await this.afs.updateComentario(item.id, result.value, this.auth.currentUser.perfil).then(()=> {
          this.cargarTurnos();
        });

        Swal.fire({
          title: 'Se finalizo el turno',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

  verComentario(item:any)
  {
    console.info('item',item);
    let quien = item.data.comentarioPaciente ? 'paciente' : 'especialista';
    let comentario = item.data.comentarioPaciente ? item.data.comentarioPaciente : item.data.comentarioEspecialista;
    Swal.fire({
      icon: 'info',
      text: 'Comentario del '+ quien +  ': ' + comentario,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Aceptar'
    });
  }

  //#endregion

}
