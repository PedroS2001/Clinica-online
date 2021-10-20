import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  arrayAdministradores:any = [];
  arrayPacientes:any = [];
  arrayEspecialistas:any = [];


  constructor( private afs: AngularFirestore) {
    console.log('ConstructorService');
    this.traerAdministradores();
    this.traerEspecialistas();
    this.traerPacientes();
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


}
