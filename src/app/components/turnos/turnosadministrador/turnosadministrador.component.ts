import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turnosadministrador', 
  templateUrl: './turnosadministrador.component.html',
  styleUrls: ['./turnosadministrador.component.css']
})
export class TurnosadministradorComponent implements OnInit {

  //Listas que se van a mostrar
  todosLosTurnos:any = [];          //Los turnos del especialista que se van a mostrar
  especialistasFiltrados:any;       //Todos los pacientes de este especialista 1 sola vez, se utiliza para el filtro
  especialidadesFiltradas:any;      //Todas las especialidades de este especialista 1 sola vez, se utiliza para el filtro
  
  turnosSinFiltrar:any;             //Todos los turnos del especialista. Se mantiene constante


  constructor(public afs:FirebaseService, private auth:AuthService) { }

  ngOnInit(): void {
    this.cargarTurnos();
    this.filtrarEspecialidades();
    this.filtrarEspecialistas();
  }


  /** Carga todos los turnos del especialista que se encuentra logueado
   *  Los coloca en la variable que luego se va a mostrar
   */
  cargarTurnos()
  {
    let listadoTurnos = this.afs.listaTurnos;
    this.todosLosTurnos = [];

    listadoTurnos.forEach( (item:any) => {
      this.todosLosTurnos.push(item);
    });
    this.turnosSinFiltrar = this.todosLosTurnos;
  }

  /** Filtra el array de pacientes que se va a mostrar por un paciente en particular
   * 
   * @param paciente El paciente por el que se quiere filtrar
   *  suponiendo que en paciente se le pasa 'perez, juan', al nuevo array le asignaria solo los turnos que sean de juan perez
   */
  filtrarPorEspecialista(paciente:any)
  {
    this.todosLosTurnos = this.turnosSinFiltrar; //reinicio todos los turnos
    let arrayAux:any = this.todosLosTurnos.filter( (element:any) => element.data.especialista == paciente  );
    this.todosLosTurnos = arrayAux;
  }

  /** Filtra el array por una determinada especialidad
   * 
   * @param item la especialidad 
   */
  filtrarPorEspecialidad(item:any)
  {
    this.todosLosTurnos = this.turnosSinFiltrar;
    let arrayAux:any = this.todosLosTurnos.filter( (element:any) => element.data.especialidad == item  );

    this.todosLosTurnos = arrayAux;
  }


  /** Hace el filtro de todos los pacientes. quita los repetidos para que esten una sola vez
   *  dejando en un array todos los pacientes que hay, una sola vez
   */
  filtrarEspecialistas()
  {
    this.todosLosTurnos = this.turnosSinFiltrar; //reinicio el array de turnos para que agarre todos
    this.especialistasFiltrados = [];
    let data:any = [];
    this.todosLosTurnos.forEach( (element:any) => {
      data.push(element.data.especialista);
    });

    this.especialistasFiltrados = data.filter( (item:any, index:any) => data.indexOf(item) === index )

  }

  /** Filtra las especialidades del especialista
   *  Si tiene 5 turnos como cardiologo y 3 como oftalmologo 
   *  le deja solo 1 vez cardiologo y 1 oftalmologo en el nuevo array
   */
  filtrarEspecialidades()
  {
    this.todosLosTurnos = this.turnosSinFiltrar;
    this.especialidadesFiltradas = [];
    let data:any = [];
    this.todosLosTurnos.forEach( (element:any) => {
      data.push(element.data.especialidad);
    });

    this.especialidadesFiltradas = data.filter( (item:any,index:any) => {
      return data.indexOf(item) === index;
    })
    // console.log(this.especialidadesFiltradas)
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

  //#endregion
}
