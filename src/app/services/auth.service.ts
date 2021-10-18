import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  estaLogueado:boolean = false;
  estaVerificado:boolean = false;
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

  /*ValidarCorreo(mail:string)
  {
    let actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'http://localhost:4200/validarmail',
      // This must be true.
      handleCodeInApp: true,
    };

    this.auth.sendSignInLinkToEmail(mail , actionCodeSettings).then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      this.toastr.success('Se envio el mensaje al correo','', {
        timeOut:1500,
        closeButton:true
      })
      window.localStorage.setItem('emailForSignIn', mail);
      // ...
    })
    .catch((error) => {
      this.toastr.success(error.message, '', {
        timeOut:1500,
        closeButton:true
      })
      // const errorCode = error.code;
      // const errorMessage = error.message;
    });
  }*/
  
  

}
