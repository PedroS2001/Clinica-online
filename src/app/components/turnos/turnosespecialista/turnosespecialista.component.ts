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

  //Listas que se van a mostrar
  turnosDelEspecialista:any = [];   //Los turnos del especialista que se van a mostrar
  pacientesFiltrados:any;           //Todos los pacientes de este especialista 1 sola vez, se utiliza para el filtro
  especialidadesFiltradas:any;      //Todas las especialidades de este especialista 1 sola vez, se utiliza para el filtro
  
  turnosSinFiltrar:any;             //Todos los turnos del especialista. Se mantiene constante


  constructor(public afs:FirebaseService, private auth:AuthService) { }

  ngOnInit(): void {
    this.cargarTurnos();
    this.filtrarEspecialidades();
    this.filtrarPacientes();
  }


  /** Carga todos los turnos del especialista que se encuentra logueado
   *  Los coloca en la variable que luego se va a mostrar
   */
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

  /** Filtra el array de pacientes que se va a mostrar por un paciente en particular
   * 
   * @param paciente El paciente por el que se quiere filtrar
   *  suponiendo que en paciente se le pasa 'perez, juan', al nuevo array le asignaria solo los turnos que sean de juan perez
   */
  filtrarPorPaciente(paciente:any)
  {
    this.turnosDelEspecialista = this.turnosSinFiltrar; //reinicio todos los turnos

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

  /** Filtra el array por una determinada especialidad
   * 
   * @param item la especialidad 
   */
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


  /** Hace el filtro de todos los pacientes. quita los repetidos para que esten una sola vez
   *  dejando en un array todos los pacientes que hay, una sola vez
   */
  filtrarPacientes()
  {
    this.turnosDelEspecialista = this.turnosSinFiltrar; //reinicio el array de turnos para que agarre todos
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

  /** Filtra las especialidades del especialista
   *  Si tiene 5 turnos como cardiologo y 3 como oftalmologo 
   *  le deja solo 1 vez cardiologo y 1 oftalmologo en el nuevo array
   */
  filtrarEspecialidades()
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
