import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading = false;

  public formulario!: FormGroup;
  constructor(private fb: FormBuilder, private afs:FirebaseService,
     private authService:AuthService, private toastr:ToastrService, private router:Router) {
   }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      'mail': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
    this.cargarBotones();
  }

  funcioncita(correo:string)
  {
    this.afs.arrayAdministradores.forEach( (element:any) => {
      // console.info('administrador', element);
      if(element.data.mail == correo)
      {
        this.authService.currentUser = element.data;
        this.authService.currentUser.id = element.id;
        // console.info('le pego',correo);
      }
    });
    this.afs.arrayPacientes.forEach( (element:any) => {
      // console.info('paciente', element);
      if(element.data.mail == correo)
      {
        this.authService.currentUser = element.data;
        this.authService.currentUser.id = element.id;
        // console.info('le pego',correo);
      }
    });
    this.afs.arrayEspecialistas.forEach( (element:any) => {
      // console.info('especialsta', element);
      if(element.data.mail == correo)
      {
        this.authService.currentUser = element.data;
        this.authService.currentUser.id = element.id;
        // console.info('le pego',correo);
      }
    });
  }


  /** 
   *  Recoge el mail y la contraseña del formulario y ingresa en ese usuario, verificando que tenga el mail validado
   */
  Ingresar() {
    this.loading = true;
    let correo = this.formulario.get('mail')?.value;
    let clave = this.formulario.get('password')?.value;

    this.authService.Ingresar(correo, clave)
    .then((result) => {
  
      // console.info('RESULTADO', result);
      //si tiene el email verificado lo logueo, sino le aviso que no esta logueado
      if(result.user?.emailVerified)
      {
        this.funcioncita(correo);

        if(this.authService.currentUser.perfil == 'especialista')
        {
          if(!this.authService.currentUser.habilitado)
          {
            this.toastr.error('No se encuentra habilitado','Error', {
              timeOut:1500,
              closeButton:true
            });
            this.authService.currentUser = '';
            this.authService.SignOut();
            this.loading = false;
            return;
          }
        }
        this.authService.estaLogueado = true;
        
        // console.info('currentUser', this.authService.currentUser);  
        this.toastr.success('Ingreso con exito','Bienvenido', {
          timeOut:1500,
          closeButton:true
        })
        this.loading = false;
        this.router.navigateByUrl('bienvenida');
      }
      else
      {
        this.toastr.warning('El email no esta verificado','Error', {
          timeOut:1500,
          closeButton:true
        });
        this.loading = false;
      }
      //En Caso de que ponga una contraseña o mail invalidos, le muestro un toast generico
    }).catch((error) => {
      console.log(error);
      this.toastr.error('Credenciales invalidas','Error', {
        timeOut:1500,
        closeButton:true
      })
      this.loading = false;

    });
  }

  
  ingresaEspecialista()
  {
    this.formulario.get('mail')?.setValue('juani.mp1@gmail.com');
    this.formulario.get('password')?.setValue('mazzucco');
    // this.formulario.get('mail')?.setValue('gikerucsubustosgil@gmail.com');
    // this.formulario.get('password')?.setValue('felipe');
  }

  ingresaPaciente()
  {
    this.formulario.get('mail')?.setValue('facundofalcioni2410@gmail.com');
    this.formulario.get('password')?.setValue('facundo');
  }

  ingresaAdministrador()
  {
    this.formulario.get('mail')?.setValue('pedroseneriz01@gmail.com');
    this.formulario.get('password')?.setValue('123456');
  }

  usuariosLogin:any = [];
  cargarBotones()
  {
    this.usuariosLogin.push(this.afs.arrayAdministradores[1]);
    this.usuariosLogin.push(this.afs.arrayEspecialistas[0]);
    this.usuariosLogin.push(this.afs.arrayEspecialistas[1]);
    this.usuariosLogin.push(this.afs.arrayPacientes[0]);
    this.usuariosLogin.push(this.afs.arrayPacientes[1]);

    //this.maicol = this.afs.arrayAdministradores[1].data.imagen;
    // this.afs.arrayAdministradores[1].data.mail;
    // this.afs.arrayAdministradores[1].data.password;

  }

  ingresaUsuario(item:any)
  {
    this.formulario.get('mail')?.setValue(item.data.mail);
    this.formulario.get('password')?.setValue(item.data.password);
  }

}
