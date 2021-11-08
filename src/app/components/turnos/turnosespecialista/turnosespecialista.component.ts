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
    this.filtrarPorX('especialidad')
  }


  /** Carga todos los turnos del especialista que se encuentra logueado
   *  Los coloca en la variable que luego se va a mostrar
   */
  cargarTurnos()
  {
    let listadoTurnos = this.afs.listaTurnos;
    this.turnosDelEspecialista = [];

    listadoTurnos.forEach( (turno:any) => {
      console.log(turno);
      if(turno.data.dniEspecialista == this.auth.currentUser.dni)
      {
        this.turnosDelEspecialista.push(turno);
      }
    });
    this.turnosSinFiltrar = this.turnosDelEspecialista;


    (<HTMLInputElement> document.getElementById('mama')).value = '';
    (<HTMLInputElement> document.getElementById('pepe')).value = '';

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

    // console.log(this.pacientesFiltrados)
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
    // console.log(this.especialidadesFiltradas)
  }

  todosFiltros:any = [];
  filtrarPorX(filtro:any)
  {
    this.todosFiltros[filtro] = {};
    let data:any = [];
    this.turnosSinFiltrar.forEach( (element:any) => {
      data.push(element.data[filtro]);
    });

    this.todosFiltros[filtro] = data.filter((item:any,index:any)=>{
      return data.indexOf(item) === index;
    })
    console.info('TURNOS', this.turnosSinFiltrar);
    console.log('filtroPOR'+filtro,this.todosFiltros[filtro])
  }

  objectKeys:any;
  filtrarPorTodo()
  {
    this.objectKeys = Object.keys(this.turnosSinFiltrar[0].data);
    this.objectKeys.forEach( (element:any) => {
      this.filtrarPorX(element);
    });

  }



  //#region ACCIONES

  cancelarTurno(turno:any)
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
        await this.afs.updateEstado(turno.id, 'cancelado');
        await this.afs.updateComentario(turno.id, result.value, this.auth.currentUser.perfil).then(()=> {
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


  rechazarTurno(turno:any)
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
        await this.afs.updateEstado(turno.id, 'rechazado');
        await this.afs.updateComentario(turno.id, result.value, this.auth.currentUser.perfil).then(()=>{
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


  async aceptarTurno(turno:any)
  {
    Swal.fire({
      icon: 'success',
      text: 'Se acepto el turno',
      // showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Aceptar'
    });
    this.afs.updateEstado(turno.id, 'aceptado').then( () => {
      this.cargarTurnos();
    });
  }


  finalizarTurno(turno:any)
  {
    console.info(turno);
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
        await this.afs.updateEstado(turno.id, 'realizado');
        await this.afs.updateComentario(turno.id, result.value, this.auth.currentUser.perfil).then(()=> {
          this.cargarTurnos();
        });
        Swal.fire({
          title: 'Se finalizo el turno',
          confirmButtonText: 'Aceptar'
        })
      }
      this.completarHistoriaClinica(turno.data.dniPaciente, turno.data.fecha, turno.data.especialidad);
    });
  }


  verComentario(turno:any)
  {
    console.info('turno',turno);
    let quien = turno.data.comentarioPaciente ? 'paciente' : 'especialista';
    let comentario = turno.data.comentarioPaciente ? turno.data.comentarioPaciente : turno.data.comentarioEspecialista;
    Swal.fire({
      icon: 'info',
      text: 'Comentario del '+ quien +  ': ' + comentario,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Aceptar'
    });
  }
  //#endregion


  completarHistoriaClinica(dniPaciente:number, fechaa:any, especialidad:string)
  {
        /*************************** DATOS FIJOS */
    Swal.fire({
      title: 'Datos fijos',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Enviar',
      html:
        '<input id="altura" placeholder="Altura" class="swal2-input">' +
        '<input id="peso" placeholder="Peso" class="swal2-input">' +
        '<input id="temperatura" placeholder="Temperatura" class="swal2-input">' +
        '<input id="presion" placeholder="Presion" class="swal2-input">',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve({
            altura: (<HTMLInputElement> document.getElementById('altura')).value,
            peso : (<HTMLInputElement> document.getElementById('peso')).value,
            temperatura : (<HTMLInputElement> document.getElementById('temperatura')).value,
            presion : (<HTMLInputElement> document.getElementById('presion')).value,
          })
        })
      }
    })
    .then((datosFijos:any) => {
        if (datosFijos.isConfirmed) {
          /***************************DATOS VARIABLES----CLAVES */
        Swal.fire({
          title: 'Datos variables',
          showCancelButton: true,
          showLoaderOnConfirm: true,
          confirmButtonText: 'Enviar',
          html:
            '<input id="clave1" placeholder="Clave 1" class="swal2-input">' +
            '<input id="clave2" placeholder="Clave 2" class="swal2-input">' +
            '<input id="clave3" placeholder="Clave 3" class="swal2-input">',
          preConfirm: function () {
            return new Promise(function (resolve) {
              resolve({
                clave1: (<HTMLInputElement> document.getElementById('clave1')).value,
                clave2 : (<HTMLInputElement> document.getElementById('clave2')).value,
                clave3 : (<HTMLInputElement> document.getElementById('clave3')).value,
              })
            })
          }
        })
        .then((datosVariablesClaves:any) => {
          if (datosVariablesClaves.isConfirmed) {
              /***********************DATOS VARIABLES ----- VALORES */
            Swal.fire({
              title: 'Valores datos variables',
              showCancelButton: true,
              showLoaderOnConfirm: true,
              confirmButtonText: 'Enviar',
              html:
                '<input id="valor1" placeholder="valor 1" class="swal2-input">' +
                '<input id="valor2" placeholder="valor 2" class="swal2-input">' +
                '<input id="valor3" placeholder="valor 3" class="swal2-input">',
              preConfirm: function () {
                return new Promise(function (resolve) {
                  resolve({
                    valor1: (<HTMLInputElement> document.getElementById('valor1')).value,
                    valor2 : (<HTMLInputElement> document.getElementById('valor2')).value,
                    valor3 : (<HTMLInputElement> document.getElementById('valor3')).value,
                  })
                })
              }
            })
            .then((datosVariablesValores:any) => {
              /******************************* CREO UN OBJETO CON LOS VALORES Y LO AGREGO A LA BBDD */
              if (datosVariablesValores.isConfirmed) {

                let historiaClinica:any = {
                  fecha: fechaa,
                  especialista: this.auth.currentUser.apellido + ', '+ this.auth.currentUser.nombre,
                  especialidad: especialidad,
                  altura: datosFijos.value.altura,
                  peso: datosFijos.value.peso,
                  temperatura : datosFijos.value.temperatura,
                  presion: datosFijos.value.presion,
                  dinamicoUno: {clave: datosVariablesClaves.value.clave1, valor: datosVariablesValores.value.valor1},
                  dinamicoDos: {clave: datosVariablesClaves.value.clave2, valor: datosVariablesValores.value.valor2},
                  dinamicoTres: {clave: datosVariablesClaves.value.clave3, valor: datosVariablesValores.value.valor3},
                };


                //Agrega a firebase
                this.afs.arrayPacientes.forEach( (paciente:any) => {
                  if(paciente.data.dni == dniPaciente)
                  {
                    alert(paciente.id + 'id del paciente');
                    historiaClinica.idPaciente =  paciente.id;
                    this.afs.agregarHistoriaClinica(historiaClinica);
                  }
                });
              }
            });

          }
        });

      }

    })
    .catch()
  }


  parametro:string = '';
  superFiltro()
  {
    this.turnosDelEspecialista = [];
    this.parametro = this.parametro.trim().toLowerCase();

    this.turnosSinFiltrar.forEach( (element:any) => {
      let dniEspecialista = element?.data?.dniEspecialista.toString().toLowerCase();
      let dniPaciente = element?.data?.dniPaciente?.toString().toLowerCase();
      let especialidad = element?.data.especialidad?.toString().toLowerCase();
      let especialista = element?.data?.especialista?.toString().toLowerCase();
      let comentarioEspecialista = element?.data?.comentarioEspecialista?.toString().toLowerCase();
      let estado = element?.data?.estado?.toString().toLowerCase();
      let fecha  = element?.data?.fecha?.toString().toLowerCase();
      let horario = element?.data?.horario?.toString().toLowerCase();
      let paciente = element?.data?.paciente?.toString().toLowerCase();

      if(dniEspecialista?.includes(this.parametro) || dniPaciente?.includes(this.parametro) || especialidad?.includes(this.parametro) || especialista?.includes(this.parametro) ||
      comentarioEspecialista?.includes(this.parametro) || estado?.includes(this.parametro) || fecha?.includes(this.parametro) || horario?.includes(this.parametro) || paciente?.includes(this.parametro)     )
      {
        this.turnosDelEspecialista.push(element);
      }

    });

  }


}
