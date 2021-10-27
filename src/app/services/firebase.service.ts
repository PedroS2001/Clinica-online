import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  arrayAdministradores:any = [];
  arrayPacientes:any = [];
  arrayEspecialistas:any = [];

  listaEspecialidades:any = [];


  constructor( private afs: AngularFirestore) {
    console.log('ConstructorService');
    this.traerAdministradores();
    this.traerEspecialistas();
    this.traerPacientes();
    this.traerEspecialidades();
    this.traerTurnos();
   }

  AgregarPaciente(paciente:any)
  {
    return this.afs.collection('pacientes').add(paciente);
  }

  LeerPacientes()
  {
    return this.afs.collection('pacientes').snapshotChanges();
  }

  AgregarEspecialista(especialista:any)
  {
    return this.afs.collection('especialistas').add(especialista);
  }
  
  LeerEspecialistas()
  {
    return this.afs.collection('especialistas').snapshotChanges();
  }

  AgregarAdministrador(administrador:any)
  {
    return this.afs.collection('administradores').add(administrador);
  }
  
  LeerAdministradores()
  {
    return this.afs.collection('administradores').snapshotChanges();
  }

  ModificarEstadoEspecialista(id:any, valor:any)
  {
    return this.afs.collection('especialistas').doc(id).update({habilitado:valor})
  }


  traerEspecialistas()
  {
    this.LeerEspecialistas().subscribe((especialistas) => {
      this.arrayEspecialistas = [];
      especialistas.forEach((item: any) => {
        this.arrayEspecialistas.push({
          id: item.payload.doc.id,
          data: item.payload.doc.data()
        });
      })
      setTimeout(() => {
        console.info('Especialistas', this.arrayEspecialistas);
      }, 1500);
    });
  }

  traerPacientes()
  {
    this.LeerPacientes().subscribe((pacientes) => {
      this.arrayPacientes = [];
      pacientes.forEach((item: any) => {
        this.arrayPacientes.push({
          id: item.payload.doc.id,
          data: item.payload.doc.data()
        });
      })
      setTimeout(() => {
        console.info('Pacientes', this.arrayPacientes);
      }, 1500);
    });
  }

  traerAdministradores()
  {
    this.LeerAdministradores().subscribe((administrador) => {
      this.arrayAdministradores = [];
      administrador.forEach((item: any) => {
        this.arrayAdministradores.push({
          id: item.payload.doc.id,
          data: item.payload.doc.data()
        });
      })
      setTimeout(() => {
        console.info('Administradores', this.arrayAdministradores);
      }, 1500);   
    });
  }



  LeerEspecialidades()
  {
    return this.afs.collection('especialidades').snapshotChanges();
  }
  traerEspecialidades()
  {
    this.LeerEspecialidades().subscribe((especialidades) => {
      this.listaEspecialidades = [];
      especialidades.forEach((item: any) => {
        this.listaEspecialidades.push(
          item.payload.doc.id
        );
      })
      setTimeout(() => {
        console.info('Especialidades', this.listaEspecialidades);
      }, 1500);   
    });
  }

  agregarTurno(especialista:string, datos:any)
  {
    return this.afs.collection('turnos').doc(especialista).set(datos);
  }

  listaTurnos:any;
  LeerTurnos()
  {
    return this.afs.collection('turnos').snapshotChanges();
  }
  traerTurnos()
  {
    this.LeerTurnos().subscribe((Turnos) => {
      this.listaTurnos = [];
      Turnos.forEach((item: any) => {
        this.listaTurnos.push({
          data : item.payload.doc.data(),
          id: item.payload.doc.id
        });
      })
      setTimeout(() => {
        console.info('Turnos', this.listaTurnos);
      }, 1500);   
    });
  }

  updateEstado(documento:string, nuevoEstado:string)
  {
    return this.afs.collection('turnos').doc(documento).update({'estado': nuevoEstado})
  }
  updateComentario(documento:string, comentario:string, usuario:string)
  {
    if(usuario == 'especialista')
    {
      return this.afs.collection('turnos').doc(documento).update({'comentarioEspecialista': comentario});
    }
    else{
      return this.afs.collection('turnos').doc(documento).update({'comentarioPaciente': comentario});
    }

  }

  updateDias(documento:string, dias:any)
  {
    return this.afs.collection('especialistas').doc(documento).update({'dias': dias});
  }
  updateHorarios(documento:string, horarios:any)
  {
    return this.afs.collection('especialistas').doc(documento).update({'horarios': horarios});
  }

  agregarCalificacion(documento:string, calificacion:any)
  {
    return this.afs.collection('turnos').doc(documento).update({'calificacion': calificacion});
  }
  completarEncuesta(documento:string, encuesta:any)
  {
    return this.afs.collection('turnos').doc(documento).update({'encuesta': encuesta});
  }



}
