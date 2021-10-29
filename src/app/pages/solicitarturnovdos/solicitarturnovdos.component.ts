import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-solicitarturnovdos',
  templateUrl: './solicitarturnovdos.component.html',
  styleUrls: ['./solicitarturnovdos.component.css']
})
export class SolicitarturnovdosComponent implements OnInit {

  loading:boolean = false;

  constructor(public afs:FirebaseService, public auth:AuthService, private toastr:ToastrService) { 
  }

  ngOnInit(): void {
    this.cargarEspecialistas();
    this.verificarDisponibilidad();
  }


  pacienteSeleccionado:any = null;      //Sirve solo para cuando el usuario administrador saca turno
  //listaEspecialistas se muestra en el html
  listaEspecialistas:any = [];          //Lista con todos los especialistas
  elEspecialista:any;                   //El especialista seleccionado con el que vamos a trabajar

  listadoDias:any = [];                 //Todos los dias que trabaja en estas 2 semanas
  horariosAtencion:any = [];            //Index de los horarios en los que trabaja. El horario real seria esto+8



  /** Carga todos los especialistas que tenemos en listaEspecialistas,
   *  que luego se va a mostrar para que el usuario pueda seleccionar el que quiera
   * 
   */
  cargarEspecialistas()
  {
    this.listaEspecialistas = [];
    this.afs.arrayEspecialistas.forEach( (element:any) => {
      this.listaEspecialistas.push(element);
    });
  }


  arrayTotalDias:any = [];
  arrayTotalHoras:any = [];
  arrayTotalNombres:any = [];
  turnosDisponibles:any = [];

  /** 
   * 
   * @param especialista el especialista seleccionado, del que se van a cargar los turnos
   */
  cargarTurnosDelEspecialista(especialista:any)
  {
    this.horariosAtencion = [];
    this.listadoDias = [];
    this.dias = [];

    this.fecha = new Date();
    this.elEspecialista = especialista;
    
    especialista.data.dias.forEach( (element:any, index:number) => {
      if(element)
      {
        this.dias.push(index);
      }
    });

    this.sumarDias(this.fecha,14);

    especialista.data.horarios.forEach((element:any, index:number) => {
      if(element)
      {
        this.horariosAtencion.push(index);
      }
      
    });
    this.arrayTotalDias = [];
    this.listadoDias.forEach( (dia:any) => {

      this.horariosAtencion.forEach( (element:any) => {
        this.arrayTotalHoras.push(element+8);
        this.arrayTotalDias.push(dia);
        this.arrayTotalNombres.push( dia + ' ' +(element+8)+'hs');
      });
      
    });

    console.info('listadoDias', this.listadoDias);
    console.info('HorariodeAtencion', this.horariosAtencion);
    console.info('arrayTotalDias', this.arrayTotalDias);
    console.info('arrayTotalHoras', this.arrayTotalHoras);
    console.info('arrayTotalNombres', this.arrayTotalNombres);

    console.info('diasindice',this.dias);

    this.verificarDisponibilidad();
  }



  nombreTurno:any;
  datosTurno:any = new Object();
  sacarTurno(indiceArrayTotal:any)
  {
    this.loading = true;
    if(this.auth.currentUser.perfil == 'administrador' && this.pacienteSeleccionado == null)
    {
      this.toastr.error('Primero debe seleccionar un paciente','Error', {
        timeOut:1500,
        closeButton:true
      })
      this.loading = false;
      return;
    }
    try
    {
      this.datosTurno.especialista = this.elEspecialista.data.apellido + ', ' + this.elEspecialista.data.nombre ;
      this.datosTurno.dniEspecialista = this.elEspecialista.data.dni;
      if(this.pacienteSeleccionado)
      {
        this.datosTurno.paciente = this.pacienteSeleccionado.data.apellido + ', ' +  this.pacienteSeleccionado.data.nombre;
        this.datosTurno.dniPaciente = this.pacienteSeleccionado.data.dni;
      }
      else
      {
        this.datosTurno.paciente = this.auth.currentUser.apellido + ', ' +  this.auth.currentUser.nombre;
        this.datosTurno.dniPaciente = this.auth.currentUser.dni;
      }
      this.datosTurno.especialidad = this.elEspecialista.data.especialidad;
      this.datosTurno.fecha = this.arrayTotalDias[indiceArrayTotal];
      this.datosTurno.horario = this.arrayTotalHoras[indiceArrayTotal]
      this.datosTurno.estado = 'pendiente';

      this.nombreTurno = this.datosTurno.fecha+'_'+this.datosTurno.especialista + '_'+ this.datosTurno.horario;
      console.log(this.datosTurno);

      this.afs.agregarTurno(this.nombreTurno, this.datosTurno).then( () =>{
        // this.seleccionaDia(this.fechaSeleccionada);

        /***HABRIA QUE EDITAR EL ESPECIALIST Y PACIENTE PARA VINCULARLO?? noup*/
        this.toastr.success('Se reservo el turno','Exito', {
          timeOut:1500,
          closeButton:true
        })
        this.loading = false;
        this.cargarTurnosDelEspecialista(this.elEspecialista);
      })
    }
    catch(e:any)
    {
      console.log(e);

        this.toastr.error('Ocurrio un error','Error', {
          timeOut:1500,
          closeButton:true
        })
        this.loading = false;
    }
  }

  listaTurnosDisponibles:any = [];
  verificarDisponibilidad()
  {
    this.listaTurnosDisponibles = [];
    let potencialNombre:string;
    let flagEncontro = false;

    this.arrayTotalDias.forEach((element:any, index:number) => {
      flagEncontro = false;
      potencialNombre = element + '_' + this.elEspecialista.data.apellido + ', ' + this.elEspecialista.data.nombre + '_' + this.arrayTotalHoras[index];

      this.afs.listaTurnos.forEach( (turno:any, index:number) => {
        console.info('turno',turno);
        if(turno.id == potencialNombre)
        {
          flagEncontro = true;
        }
        
      });

      if(!flagEncontro)
      {
        this.listaTurnosDisponibles.push(potencialNombre);
      }
    });
  }




  //LUNES Y MIERCOLES
  dias:any = [];//= [1,3]
  fecha:Date = new Date();




  /*seleccionaDia(fecha:any)
  {
    let potencialNombre:string;
    //Tendria que buscar los turnos que tiene ese especialista en esa fecha seleccionada y mostrarle el horario de los disponibles
    this.fechaSeleccionada = fecha;
    this.horariosAtencion = [];

    let horario = this.elEspecialista.data.horarios; //todos los horarios que puede trabajar

    horario.forEach( (item:any, index:any) => {
      //Si el valor es true, significa que trabaja en ese horario, si es false no.
      if(item)
      {
        potencialNombre = this.arrayTotalDias[index] + '_' + this.elEspecialista.data.apellido + ', ' + this.elEspecialista.data.nombre + '_' + (index+8);
        let pedrito = false;
        this.afs.listaTurnos.forEach( (nombre:any) => {
          console.info('PTENCIALLNOMBR', potencialNombre);
          console.info('NOMBREDOC', nombre.id);
          if(potencialNombre == nombre.id)
          {
            console.log('TURNO OCUPADO');
            pedrito = true;
          }
          else
          {
            // this.horariosAtencion.push(index+8);
            console.log('noesigual');
          }
        });

        console.log('salio');
        if(!pedrito)
        {
          alert(pedrito);
          this.horariosAtencion.push(index+8);
        }
        else{
          alert(pedrito);
        }
      }
      
    });
    console.log(this.horariosAtencion);
    if(this.horariosAtencion.length == 0)
    {
      this.horariosAtencion.push('No hay turnos disponibles');
    }
  }
*/
  


  /** Le suma x dias a la fecha actual.
   *  Cada vez que suma un dia, llama a la funcion asignarDias que evalua que dia de la semana es
   * @param fecha fecha actual
   * @param dias cantidad de dias a sumarle a la fecha actual
   */
  sumarDias(fecha:any, dias:any){
    for (let index = 0; index < dias; index++) {
      fecha.setDate(fecha.getDate() + 1);
    
      this.asignarDias(index);
    }
  }

  /** Se le pasa un numero y determina que dia de la semana es.
   *  Compara ese dia con los que trabaja el especialista
   *  Si ese dia el especialista trabaja, agrega el dia al array de dias que se va a mostrar
   * 
   * @param pepe numero de 0 a 6 que simboliza un dia de la semana de domingo a sabado
   */
  asignarDias(pepe:any)
  {
    pepe += new Date().getDay() + 1 ;
    //Obtiene el dia actual
    let dia = this.fecha.getDate() + '-' + (this.fecha.getMonth()+1);
    console.info('fehca dia',dia)

    this.dias.forEach( (element:any) => {
      
      if(pepe>=7)
      {
        pepe-=7;
      }

      if(element == pepe)
      {
        this.listadoDias.push(dia);
      }
      
    });
  }


}
