import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-seccionpacientes',
  templateUrl: './seccionpacientes.component.html',
  styleUrls: ['./seccionpacientes.component.css']
})
export class SeccionpacientesComponent implements OnInit {

  constructor(private auth:AuthService, private afs:FirebaseService) { }

  ngOnInit(): void {
    this.traerMISPacientes();
  }

  pacientesEnteros:any = [];
  misPacientes:any;
  misTurnos:any =[];
  traerMISPacientes()
  {
    let pacientesFiltrados:any = [];
    let data:any = [];
    this.afs.arrayPacientes.forEach( (paciente:any) => {
      data.push(paciente.data.dni);
    });

    pacientesFiltrados = data.filter((item:any,index:any)=>{
      return data.indexOf(item) === index;
    })
    // console.info(pacientesFiltrados);

    let elEspecialista = this.auth.currentUser.apellido + ', ' +this.auth.currentUser.nombre;

    this.afs.listaTurnos.forEach( (turno:any) => {
      if(turno.data.dniEspecialista == this.auth.currentUser.dni)
      {
        //LOS TURNOS DE ESTE ESPECIALISTA
        this.misTurnos.push(turno.data);
        // console.info('turno',turno);
      }
      
    });

    this.misPacientes = []
    pacientesFiltrados.forEach( (paciente:any) => {
      let pp = true;
      this.misTurnos.forEach( (unTurno:any) => {
        if(paciente == unTurno.dniPaciente)
        {
          if(pp)
          {
            pp=false;
            this.misPacientes.push(paciente);
            // console.info('dniIgual');
          }
        }
        // console.info('dnipaciente', paciente);
      });
    });

    // console.info('paceintecConTurnos', this.misPacientes);

    this.misPacientes.forEach( (miPaciente:any) => {
      
      this.afs.arrayPacientes.forEach( ( paciente:any) => {
        if(paciente.data.dni == miPaciente)
        {
          this.pacientesEnteros.push(paciente);
        }
        
      });
    });

    // console.info('pacietne entero', this.pacientesEnteros);

  }

  usuario:any;
  mostrarHistoria:boolean = false;
  mostrarHC(paciente:any)
  {
    this.usuario = paciente;
    this.mostrarHistoria = true;

  }

}