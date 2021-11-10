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

  
  turnosDelPaciente:any = [];   //Los turnos del especialista que se van a mostrar
   
  turnosSinFiltrar:any;         //Todos los turnos del especialista. Se mantiene constante

  constructor(private afs:FirebaseService, private auth:AuthService) { }

  ngOnInit(): void {
    this.cargarTurnos();
  }



  cargarTurnos()
  {
    let listadoTurnos = this.afs.listaTurnos;
    this.turnosDelPaciente = [];

    listadoTurnos.forEach( (item:any) => {
      // console.log(item);
      if(item.data.dniPaciente == this.auth.currentUser.dni)
      {
        this.turnosDelPaciente.push(item);
      }
    });
    this.turnosSinFiltrar = this.turnosDelPaciente;

  }

<<<<<<< HEAD
  /** Filtra el array de pacientes que se va a mostrar por un paciente en particular
   * 
   * @param paciente El paciente por el que se quiere filtrar
   *  suponiendo que en paciente se le pasa 'perez, juan', al nuevo array le asignaria solo los turnos que sean de juan perez
   */
  filtrarPorEspecialista(paciente:any)
  {
    this.turnosDelPaciente = this.turnosSinFiltrar; //reinicio todos los turnos

    let arrayAux:any = [];
    this.turnosDelPaciente.forEach( (element:any) => {
      // console.log(element);
      if(element.data.especialista == paciente )
      {
        arrayAux.push(element);
      }
    });

    this.turnosDelPaciente = arrayAux;
  }
=======
>>>>>>> produccion

  parametro:string = '';
  superFiltro()
  {
    this.turnosDelPaciente = [];
    this.parametro = this.parametro.trim().toLowerCase();

<<<<<<< HEAD
    let arrayAux:any = [];
    this.turnosDelPaciente.forEach( (element:any) => {
      // console.log(element);
      if(element.data.especialidad == item )
=======
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
>>>>>>> produccion
      {
        this.turnosDelPaciente.push(element);
      }
<<<<<<< HEAD
    });

    this.turnosDelPaciente = arrayAux;
  }


  /** Hace el filtro de todos los pacientes. quita los repetidos para que esten una sola vez
   *  dejando en un array todos los pacientes que hay, una sola vez
   */
  filtrarEspecialistas()
  {
    this.turnosDelPaciente = this.turnosSinFiltrar; //reinicio el array de turnos para que agarre todos
    this.especialistasFiltrados = [];
    let data:any = [];
    this.turnosDelPaciente.forEach( (element:any) => {
      data.push(element.data.especialista);
    });

    this.especialistasFiltrados = data.filter((item:any,index:any)=>{
      return data.indexOf(item) === index;
    })

    // console.log(this.especialistasFiltrados)
  }

  /** Filtra las especialidades del especialista
   *  Si tiene 5 turnos como cardiologo y 3 como oftalmologo 
   *  le deja solo 1 vez cardiologo y 1 oftalmologo en el nuevo array
   */
  filtrarEspecialidades()
  {
    this.turnosDelPaciente = this.turnosSinFiltrar;
    this.especialidadesFiltradas = [];
    let data:any = [];
    this.turnosDelPaciente.forEach( (element:any) => {
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
    // console.info('TURNOS', this.turnosSinFiltrar);
    // console.log('filtroPOR'+filtro,this.todosFiltros[filtro])
  }

  objectKeys:any;
  filtrarPorTodo()
  {
    this.objectKeys = Object.keys(this.turnosSinFiltrar[0].data);
    this.objectKeys.forEach( (element:any) => {
      this.filtrarPorX(element);
    });

  }

  jancarlos:any;
  seleccionaF()
  {
    this.jancarlos = (<HTMLInputElement> document.getElementById('pepe')).value;
    this.seleccionaTT();
  };

  seleccionaTT()
  {
    let mama = (<HTMLInputElement> document.getElementById('mama')).value;
    this.filtrarPorElemento(this.jancarlos, mama)
  }

  filtrarPorElemento(item:any, indice:any)
  {
    // console.info('item',item);
    // console.info('indice',indice);

    // console.info('cagada',this.todosFiltros[item][indice]);
    let paciente = this.todosFiltros[item][indice]

    let arrayAux:any = [];
    this.turnosSinFiltrar.forEach( (element:any) => {
      // console.log(element);
      if(element.data[item] == paciente )
      {
        arrayAux.push(element);
=======
      else
      {
        /*this.afs.listaHistorias.forEach( (historia:any) => {
          console.info(historia);
          let altura = historia?.data?.altura?.toString().toLowerCase();
          let peso = historia?.data?.peso?.toString().toLowerCase();
          let presion = historia?.data?.presion?.toString().toLowerCase();
          let temperatura = historia?.data?.temperatura?.toString().toLowerCase();
          
          if(altura?.includes(this.parametro) || peso?.includes(this.parametro) || presion?.includes(this.parametro) || temperatura?.includes(this.parametro))
          {
            this.turnosDelPaciente.push(element);
          }
          if(historia?.data?.dinamicoUno?.clave?.toLowerCase().trim().includes(this.parametro) || historia?.data?.dinamicoUno?.valor?.toLowerCase().trim().includes(this.parametro) || 
              historia?.data?.dinamicoDos?.clave?.toLowerCase().trim().includes(this.parametro) || historia?.data?.dinamicoDos?.valor?.toLowerCase().trim().includes(this.parametro) || 
              historia?.data?.dinamicoTres?.clave?.toLowerCase().trim().includes(this.parametro) || historia?.data?.dinamicoTres?.valor?.toLowerCase().trim().includes(this.parametro) )
          {
            this.turnosDelPaciente.push(element);
          }

        });*/

>>>>>>> produccion
      }

    });

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
        await this.afs.updateComentario(item.id, result.value, 'paciente').then(()=> {
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
    // console.info('item',item);
    let quien = item.data.comentarioEspecialista ? 'especialista' : 'paciente';
    let comentario = item.data.comentarioEspecialista ? item.data.comentarioEspecialista : item.data.comentarioPaciente;
    Swal.fire({
      // title: 'Comentario',
      icon: 'info',
      text: 'Comentario del '+ quien +  ': ' + comentario,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Aceptar'
    });
  }

  completarEncuesta(item:any)
  {
    // console.info('item',item);
    Swal.fire({
      // text: 'Comentario de ' + item.data.comentarioDe + ':  ' + item.data.comentario,
      icon: 'question',
      title: '¿Se fue conforme con la atencion del medico?',
      input: 'radio',
      inputOptions: {'si':'Si', 'no':'No', 'duda':'No estoy seguro'},
      
      // showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Enviar'
    }).then((result1) => {
      if (result1.isConfirmed) {
        Swal.fire({
          icon: 'question',
          title: '¿Espero mucho tiempo?',
          input: 'radio',
          inputOptions: {'si':'Si', 'no':'No', 'duda':'No estoy seguro'},
          // showCancelButton: true,
          showLoaderOnConfirm: true,
          confirmButtonText: 'Enviar'
        }).then((result2) => {
          if (result2.isConfirmed) {
            Swal.fire({
              icon: 'question',
              title: '¿Volveria a atenderse con el mismo medico?',
              input: 'radio',
              inputOptions: {'si':'Si', 'no':'No', 'duda':'No estoy seguro'},
              // showCancelButton: true,
              showLoaderOnConfirm: true,
              confirmButtonText: 'Enviar'
          
            }).then((result3) => {
              if (result3.isConfirmed) {
                Swal.fire({
                  icon: 'question',
                  title: '¿El lugar estaba limpio?',
                  input: 'radio',
                  inputOptions: {'si':'Si', 'no':'No', 'duda':'No estoy seguro'},
                  // showCancelButton: true,
                  showLoaderOnConfirm: true,
                  confirmButtonText: 'Enviar'
                }).then(async (result4)=>{
                  if (result4.isConfirmed) {
                    // console.info('todaslasrespuestas', result1.value,result2.value,result3.value, result4.value)

                    let preguntas = [];
                    preguntas.push(result1.value);
                    preguntas.push(result2.value);
                    preguntas.push(result3.value);
                    preguntas.push(result4.value);

                    await this.afs.completarEncuesta(item.id, preguntas).then(()=>{
                      this.cargarTurnos();
                    });
                    Swal.fire({
                      title: 'Muchas gracias',
                      icon: 'success',
                      text: 'Se registro la respuesta',
                      showLoaderOnConfirm: true,
                      confirmButtonText: 'Enviar'
                    });
                  }
                });
              }
            }); //ultimo swal
          }
        });//Segundo swal
      }
    }); //Primer Swal
  }

  calificarLaAtencion(item:any)
  {
    // console.info('item',item);
    Swal.fire({
      input: 'range',
      inputAttributes: {min:'1', max:'5', step:'1'},
      title: '¿Cuantas estrellas le das?',
      icon: 'question',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Enviar'
    })
    .then(async (result) => {
      // console.info('estrellas',result.value);
      if (result.isConfirmed) {
        Swal.fire({
          input: 'text',
          title: 'Por favor deje un comentario',
          showLoaderOnConfirm: true,
          confirmButtonText: 'Enviar'
        }).then(async (resultado) => {
          this.afs.updateComentario(item.id,resultado.value, 'paciente');
          await this.afs.agregarCalificacion(item.id, result.value ).then( () => {
            this.cargarTurnos();
          });
          Swal.fire({
            title: 'Se agrego la calificacion del turno',
            icon: 'success',
            text:  result.value + ' estrellas' ,
            confirmButtonText: 'Aceptar'
          });
        })        
      }
    });
  }

  //#endregion





}
