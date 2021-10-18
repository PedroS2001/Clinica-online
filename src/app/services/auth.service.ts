import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  estaLogueado:boolean = false;
  esAdmin:boolean = false;
  currentUser:any;


  constructor(private auth: AngularFireAuth, private toastr:ToastrService, private afs:FirebaseService) { }

  Registrar(email:string, password:string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }


  // Sign in with email/password. VERIFICAR QUE EL USUARIO EXISTA Y SUS DATOS
  Ingresar(email:string, password:string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Sign Out. DESLOGUEAR AL USUARIO
  SignOut() {
    this.auth.signOut();
    this.estaLogueado = false;
  }
  
  

}
