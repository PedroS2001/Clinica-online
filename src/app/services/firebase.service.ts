import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) { }

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


  // ModificarPedido(doc:string, repartidor:any)
  // {
  //   return this.afs.collection('pedidos').doc(doc).set(repartidor);
  // }

  // EliminarRepartidor(doc:string)
  // {
  //   return this.afs.doc(doc).delete();
  // }


}
