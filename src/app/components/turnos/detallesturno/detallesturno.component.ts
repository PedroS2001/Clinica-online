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
    this.cargarTurnos();
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
    console.info('item',item);
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
    console.info('item',item);
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
                    console.info('todaslasrespuestas', result1.value,result2.value,result3.value, result4.value)

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
    console.info('item',item);
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
      console.info('estrellas',result.value);
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
