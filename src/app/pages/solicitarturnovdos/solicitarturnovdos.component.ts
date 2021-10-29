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
  pacienteSeleccionado:any = null;      //Sirve solo para cuando el usuario administrador saca turno

  constructor(public afs:FirebaseService, public auth:AuthService, private toastr:ToastrService) { 
  }

  ngOnInit(): void {
    this.cargarEspecialistas();
    this.verificarDisponibilidad();
  }

  fecha:Date = new Date();              //fecha actual, se utiliza para calcular los 15 dias proximos
  elEspecialista:any;                   //El especialista seleccionado con el que vamos a trabajar.

  listaEspecialistas:any = [];          //Lista con todos los especialistas. se muestra en el html

  listadoDias:any = [];                 //Todos los dias que trabaja en estas 2 semanas.   ej(1-11, 5-11, 8-11) las fechas
  
  
  dias:any = [];                        //Contiene los indices de los dias que trabaja.  ej(1,2,3) seria (lunes,martes,miercoles)
  horariosAtencion:any = [];            //Index de los horarios en los que trabaja. El horario real seria esto+8.  ej(0,1,2,7,8) q enrealidad serian los horarios de las(8,9,10,16,17)
  




  /** Carga todos los especialistas que tenemos en listaEspecialistas,
   *  que luego se va a mostrar para que el usuario pueda seleccionar el que quiera
   */
  cargarEspecialistas()
  {
    this.listaEspecialistas = [];
    this.afs.arrayEspecialistas.forEach( (element:any) => {
      this.listaEspecialistas.push(element);
    });
  }

  /** ArraysTotales.
   *  Los usaremos para guardar indices y que podamos manejar los 3 elementos
   * (dias, horas y nombres que se van a mostrar) emparejados con los mismos indices
   *  Cada indice representa una posibilidad de turno
   *  si hay 15 posibilidades de turnos, va a haber 15 elementos en cada array
   *  ej. [0](29-6 /  8   / 29-6 8hs)  [1](29-6 /  10  / 29-6 10hs)
   *        (Dias /Horas / Nombres )      (Dias /Horas / Nombres )
   *  */ 
  arrayTotalDias:any = [];
  arrayTotalHoras:any = [];
  arrayTotalNombres:any = [];
  // turnosDisponibles:any = [];

  /** Calcula y carga todos los turnos que puede tener el especialista, sin discriminar si esta libre u ocupado.
   *  Finalmente llama a la funcion que los filtra y muestra solo los libres
   *  Esta funcion se ejecuta cuando selecciona un especialista de la listaEspecialistas
   * @param especialista el especialista seleccionado, del que se van a cargar los turnos
   */
  cargarTurnosDelEspecialista(especialista:any)
  {
    //limpio los arrays 
    this.horariosAtencion = [];
    this.listadoDias = [];
    this.dias = [];
    this.arrayTotalDias = [];


    this.elEspecialista = especialista;                 //Guardo todos los datos del especialista seleccionado en una variable
    
    especialista.data.dias.forEach( (element:any, index:number) => {
      if(element)
      {
        this.dias.push(index);                          //Le agrego al array cada dia que el especialista trabaje
      }
    });

    this.fecha = new Date();
    this.sumarDias(this.fecha,14);            //Calcula los proximos 15 dias y los agrega a la variable listadoDias(ej. 27-11)

    especialista.data.horarios.forEach((element:any, index:number) => {
      if(element)
      {
        this.horariosAtencion.push(index);    
      }
      
    });

    //Este doble foreach sirve para calcular para cada dia que trabaje todos los horarios que puede tener (esta funcion no filtra nada, trae todo todo lo que se puede)
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

    //Llama a la funcion que filtra los horarios disponibles
    this.verificarDisponibilidad();
  }



  nombreTurno:any;
  datosTurno:any = new Object();

  /** Carga todos los datos en un objeto y lo sube a la base de datos.
   *  Verifica si es administrador, que haya seleccionado un usuario
   * @param indiceArrayTotal 
   */
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

  /** Agarra el array con todos los turnos posibles y filtra los disponibles
   *  Calcula todos los nombres posibles para guardarse en la base de datos
   *  Compara cada uno de esos nombres con cada uno de los que hay en la base de datos
   *  Si el nombre coincide con alguno, significa que ese turno esta ocupado; entonces lo filtro
   *  Si ese nombre no concide con ningun registro de la base de datos, esta libre y lo agrego a la lista de turnos libres que despues se va a mostrar
   * 
   */
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
   *  Si ese dia el especialista trabaja, agrega el dia (ej. 27-10) al array de dias
   *  @param pepe numero de 0 a 6 que simboliza un dia de la semana de domingo a sabado
   */
  asignarDias(pepe:any)
  {
    pepe += new Date().getDay() + 1 ;
    //Obtiene el dia actual para determinar que dia de la semana es hoy
    let dia = this.fecha.getDate() + '-' + (this.fecha.getMonth()+1);

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
