import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading = false;

  public formulario!: FormGroup;
  constructor(private fb: FormBuilder, private authService:AuthService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      'mail': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  error:string = "";

  enviar() {
    let correo = this.formulario.get('mail')?.value;
    let clave = this.formulario.get('password')?.value;

    this.authService.Ingresar(correo, clave)
    .then((result) => {
      this.authService.estaLogueado = true;
      this.authService.currentUser = {'correo': correo, 'clave': clave};    
      console.info('currentUser', this.authService.currentUser);  
      this.toastr.success('Ingreso con exito','Bienvenido', {
        timeOut:1500,
        closeButton:true
      })
    }).catch((error) => {
      console.log(error);
      if(error.code == 'auth/wrong-password')
      {
        this.toastr.error('Contraseña incorrecta','', {
          timeOut:1500,
          closeButton:true
        })
      }
      else
      {
        this.toastr.error('Ha ocurrido un error. Intente de nuevo mas tarde','', {
          timeOut:1500,
          closeButton:true
        })
      }
    });
    
  }

}
