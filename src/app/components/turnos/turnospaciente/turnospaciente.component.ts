import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-turnospaciente',
  templateUrl: './turnospaciente.component.html',
  styleUrls: ['./turnospaciente.component.css']
})
export class TurnospacienteComponent implements OnInit {

  constructor(public afs:FirebaseService) { }

  especialidad:any;
  listaEspecialistas:any = [];
  listadoHorarios:any = [];
  ngOnInit(): void {
  }

  /** Se llama cuando un cliente selecciona una especialidad
   * 
   *  Esta funcion agarra el array de todos los especialistas, guardado en el servicio
   *  Selecciona todos los que tengan la especialidad seleccionada
   *  y los guarda en un nuevo array de especialistas, que se va a mostrar
   * 
   * @param especialidad la especialidad buscada
   */
  seleccionaEspecialidad(especialidad:any)
  {
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

  horariosLunes:any = [];
  horariosMartes:any = [];
  horariosMiercoles:any = [];
  horariosJueves:any = [];
  horariosViernes:any = [];
  horariosSabado:any = [];

  /** Se llama a esta funcion cada vez que se selecciona un especialista
   * 
   * Esta funcion genera 
   * 
   * @param especialista 
   */
  seleccionaEspecialista(especialista:any)
  {//ESPECIALISTA CON DATA E ID
    this.listadoHorarios = [];
    let horarios = especialista.data.horarios;

    console.info('horario completo',horarios);  //DIAS => HORAS => true    si esta ocupado o no

    if(horarios['lunes'])
    {
      this.horariosLunes = horarios['lunes'];
      console.info('Horarios Lunes',this.horariosLunes);

      this.listadoHorarios.push({dia:'Lunes '+ this.horariosLunes['numero']});
      // this.mostrarListadoTurnos(this.horariosLunes);
      this.mostrarTurnosDisponibles(this.horariosLunes);
    }
    if(horarios['martes'])
    {
      this.horariosMartes = horarios['martes'];
      console.info('Horarios Martes',this.horariosMartes);

      this.listadoHorarios.push({dia:'Martes '+ this.horariosMartes['numero']});
      this.mostrarListadoTurnos(this.horariosMartes);
      this.mostrarTurnosDisponibles(this.horariosMartes);
    }if(horarios['miercoles'])
    {
      this.horariosMiercoles = horarios['miercoles'];
      console.info('Horarios Miercoles',this.horariosMiercoles);

      this.listadoHorarios.push({dia:'Miercoles '+ this.horariosMiercoles['numero']});

      // this.mostrarListadoTurnos(this.horariosMiercoles);
      this.mostrarTurnosDisponibles(this.horariosMiercoles);
    }if(horarios['jueves'])
    {
      this.horariosJueves = horarios['jueves'];
      console.info('Horarios jueves',this.horariosJueves);

      this.listadoHorarios.push({dia:'Jueves '+ this.horariosJueves['numero']});

      // this.mostrarListadoTurnos(this.horariosJueves);
      this.mostrarTurnosDisponibles(this.horariosJueves);
    }if(horarios['viernes'])
    {
      this.horariosViernes = horarios['viernes'];
      console.info('Horarios Viernes',this.horariosViernes);

      this.listadoHorarios.push({dia:'Viernes '+this.horariosViernes['numero']});

      this.mostrarListadoTurnos(this.horariosViernes);
      this.mostrarTurnosDisponibles(this.horariosViernes);
    }if(horarios['sabado'])
    {
      this.horariosSabado = horarios['sabado'];
      console.info('Horarios Sabdao',this.horariosSabado);

      this.listadoHorarios.push({dia:'Sabado '+this.horariosSabado['numero']});

      this.mostrarListadoTurnos(this.horariosSabado);
      this.mostrarTurnosDisponibles(this.horariosSabado);
    }

  }


  /** Agrega al listado de horarios, los horarios del especialista que estan libres 
   * 
   * @param dia El dia de la semana, con sus hoarrios dentro. ej: [LUNES: {{8:true}, {9:false}, {10:undefined} } ]
   */
  mostrarTurnosDisponibles(dia:any)
  {
    //Dia en la posicion 8(simboliza el horario) contiene un booleano; si esta libre u ocupado 
    if(dia['8'])
    {
      this.listadoHorarios.push('8hs');
    }
    if(dia['9'])
    {
      this.listadoHorarios.push('9hs');
    }
    if(dia['10'])
    {
      this.listadoHorarios.push('10hs');
    }if(dia['11'])
    {
      this.listadoHorarios.push('11hs');
    }if(dia['12'])
    {
      this.listadoHorarios.push('12hs');
    }if(dia['13'])
    {
      this.listadoHorarios.push('13hs');
    }if(dia['14'])
    {
      this.listadoHorarios.push('14hs');
    }if(dia['15'])
    {
      this.listadoHorarios.push('15hs');
    }if(dia['16'])
    {
      this.listadoHorarios.push('16hs');
    }if(dia['17'])
    {
      this.listadoHorarios.push('17hs');
    }if(dia['18'])
    {
      this.listadoHorarios.push('18hs');
    }
  }

  /** Solo Console logs de prueba
   * 
   * @param dia 
   */
  mostrarListadoTurnos(dia:any)
  {
    console.info('8hs',dia['8']);
    console.info('9hs',dia['9']);
    console.info('10hs',dia['10']);
    console.info('11hs',dia['11']);
    console.info('12hs',dia['12']);
    console.info('13hs',dia['13']);
    console.info('14hs',dia['14']);
    console.info('15hs',dia['15']);
    console.info('16hs',dia['16']);
    console.info('17hs',dia['17']);
    console.info('18hs',dia['18']);
    
  }

}
