import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-solicitarturno',
  templateUrl: './solicitarturno.component.html',
  styleUrls: ['./solicitarturno.component.css']
})
export class SolicitarturnoComponent implements OnInit {

  pacienteSeleccionado:any = null;

  /** En caso de que el que ingrese sea un administrador se le muestra la tabla de pacientes
   *  Debe seleccionar uno. esta funcion recibe el paciente que la tabla emite
   *  y lo guarda en la variable correspondiente
   * @param e el usuario paciente con todos sus datos
   */
  evento(e:any)
  {
    this.toastr.info('Se selecciono al paciente: ' + e.data.nombre + ' ' + e.data.apellido, '', {
      timeOut:1500,
      closeButton:true
    })
    console.log(e);
    this.pacienteSeleccionado = e; 
  }

  constructor(public afs:FirebaseService, public auth:AuthService, private toastr:ToastrService) { }

  loading:boolean = false;;
  especialidad:any;
  elEspecialista:any;
  elEspecialistaData:any;
  fechaSeleccionada:any;

  //Listas que se muestran en el html
  listaEspecialistas:any = [];
  listadoDias:any = [];
  horariosAtencion:any = [];

  
  ngOnInit(): void {
  }

  /** Se llama cuando un cliente selecciona una especialidad
   * 
   *  Esta funcion agarra el array de todos los especialistas guardado en el servicio
   *  Selecciona todos los que tengan la especialidad seleccionada
   *  y los guarda en un nuevo array de especialistas, que se va a mostrar
   * 
   * @param especialidad la especialidad buscada
   */
  seleccionaEspecialidad(especialidad:any)
  {
    this.afs.listaEspecialidades.forEach( (element:any) => {
      console.log(element);
      (<HTMLInputElement> document.getElementById(element)).style.backgroundColor = 'transparent';
      (<HTMLInputElement> document.getElementById(element)).style.color = '#1d89ff';
    });
    (<HTMLInputElement> document.getElementById(especialidad)).style.backgroundColor = '#1d89ff';
    (<HTMLInputElement> document.getElementById(especialidad)).style.color = 'white';

    this.especialidad = especialidad;

    this.listaEspecialistas = [];
    this.afs.arrayEspecialistas.forEach( (element:any) => {
      if(element.data.especialidad == especialidad)
      {
        this.listaEspecialistas.push(element);
      }
    });
    // console.log(especialidad);
    // console.log(this.listaEspecialistas);
  }

  //LUNES Y MIERCOLES
  dias:any ;//= [1,3]
  fecha:Date = new Date();
  /** Funcion que se llama cada vez que se selecciona un especialista
   *  Guarda los datos del especialista en una variable
   *  Selecciona las fechas posibles, segun los dias y horarios que tenga el especialista
   * @param especialista 
   */
  seleccionaEspecialista(especialista:any)
  {
    this.listaEspecialistas.forEach( (element:any) => {
      console.log(element);
      (<HTMLInputElement> document.getElementById(element)).style.backgroundColor = 'transparent';
      (<HTMLInputElement> document.getElementById(element)).style.color = '#1d89ff';
    });
    (<HTMLInputElement> document.getElementById(especialista)).style.backgroundColor = '#1d89ff';
    (<HTMLInputElement> document.getElementById(especialista)).style.color = 'white';

    this.elEspecialista = especialista;

    this.fecha = new Date();
    this.listadoDias = [];

    //Guarda en el array de dias los dias de la semana que trabaja el especialista (1 y 3 serian lunes y miercoles)
    this.dias = especialista.data.dias;

    console.log(this.fecha);
    this.sumarDias(this.fecha,14);
    
    //0 domingo
    //6 sabado
    console.info('fechagetday',this.fecha.getDay());
  }



  /**
   * 
   * @param fecha 27/10
   */
  seleccionaDia(fecha:any)
  {
    this.listadoDias.forEach( (element:any) => {
      console.log(element);
      (<HTMLInputElement> document.getElementById(element)).style.backgroundColor = 'transparent';
      (<HTMLInputElement> document.getElementById(element)).style.color = '#1d89ff';
    });
    (<HTMLInputElement> document.getElementById(fecha)).style.backgroundColor = '#1d89ff';
    (<HTMLInputElement> document.getElementById(fecha)).style.color = 'white';


    let potencialNombre:string;
    //Tendria que buscar los turnos que tiene ese especialista en esa fecha seleccionada y mostrarle el horario de los disponibles
    this.fechaSeleccionada = fecha;
    this.horariosAtencion = [];

    let horario = this.elEspecialista.data.horarios; //todos los horarios que puede trabajar
    console.info('horario',this.elEspecialista);

    horario.forEach( (item:any, index:any) => {
      // console.info('item',item);
      // console.info('index',index);
      //Si el valor es true, significa que trabaja en ese horario, si es false no.
      if(item)
      {
        //HABRIA QUE HACER QUE COMPARE 1 NOMBRE SOLO(CON INDEX+8)

        potencialNombre = this.fechaSeleccionada + '_' + this.elEspecialista.data.apellido + ', ' + this.elEspecialista.data.nombre + '_' + (index+8);
        // console.info('POTENCIAL NOMBRE',potencialNombre);

        let pedrito = false;
        this.afs.listaTurnos.forEach( (nombre:any) => {
          console.info('PTENCIALLNOMBR', potencialNombre);
          console.info('NOMBREDOC', nombre);
          if(potencialNombre == nombre)
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
          this.horariosAtencion.push(index+8);
        }
      }
      
    });
    console.log(this.horariosAtencion);
    if(this.horariosAtencion.length == 0)
    {
      this.horariosAtencion.push('No hay turnos disponibles');
    }
  }

  datosTurno:any = new Object();
  /** la funcion se ejecuta cada vez que el usuario selecciona un horario.
   *  agarra los datos del especialista y del paciente
   *  y les asigna un turno en la fecha y horario seleccionados
   * 
   * @param hora la hora del turno seleccionada
   */
  seleccionaHorario(hora:any)
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
      this.datosTurno.fecha = this.fechaSeleccionada;
      this.datosTurno.horario = hora;
      this.datosTurno.estado = 'pendiente';

      this.elEspecialistaData = this.fechaSeleccionada+'_'+this.datosTurno.especialista + '_'+ hora;
      console.log(this.datosTurno);

      this.afs.agregarTurno(this.elEspecialistaData, this.datosTurno).then( () =>{
        this.seleccionaDia(this.fechaSeleccionada);

        /***HABRIA QUE EDITAR EL ESPECIALIST Y PACIENTE PARA VINCULARLO?? */
        this.toastr.success('Se reservo el turno','Exito', {
          timeOut:1500,
          closeButton:true
        })
        this.loading = false;
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
      
      console.info('dias foreach',element)
      if(pepe>=7)
      {
        pepe-=7;
      }
    console.info('numero que indica el dia: ',pepe);

      if(element == pepe)
      {
        if(pepe == 1)
        {
          // this.listadoDias.push({dia:'Lunes'});
          console.log('LUNES');
        }
        if(pepe == 2)
        {
          // this.listadoDias.push({dia:'Martes'});
          console.log('MARTES');
        }
        if(pepe == 3)
        {
          // this.listadoDias.push({dia:'Miercoles'});
          console.log('MIERCOLES ');
        }
        if(pepe == 4)
        {
          // this.listadoDias.push({dia:'Jueves'});
          console.log('JUEVES');
        } if(pepe == 5)
        {
          // this.listadoDias.push({dia:'Viernes'});
          console.log('VIERNES');
        } if(pepe == 6)
        {
          // this.listadoDias.push({dia:'Sabado'});
          console.log('SABADO');
        }
        console.log(dia);
        this.listadoDias.push(dia);

      }
    });
  }

  /** Le suma x dias a la fecha actual.
   *  Cada vez que suma un dia, llama a la funcion asignarDias que evalua que dia de la semana es
   *  Si es un dia que el especialista atiende agrega la fecha para que pueda ser seleccionada
   * 
   * @param fecha fecha actual
   * @param dias cantidad de dias a sumarle a la fecha actual
   * @returns no sirve de nada?
   */
  sumarDias(fecha:any, dias:any){

    for (let index = 0; index < dias; index++) {
      fecha.setDate(fecha.getDate() + 1);
    
      this.asignarDias(index);
    }
    return fecha;
  }
}
