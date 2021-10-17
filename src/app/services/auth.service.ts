import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  estaLogueado:boolean = false;
  currentUser:any;


  constructor(private auth: AngularFireAuth) { }

  SignUp(email:string, password:string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // Sign in with email/password. VERIFICAR QUE EL USUARIO EXISTA Y SUS DATOS
  SignIn(email:string, password:string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Sign Out. DESLOGUEAR AL USUARIO
  SignOut() {
    this.auth.signOut();
    this.estaLogueado = false;
    }

}
