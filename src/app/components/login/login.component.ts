import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loading = false;

  public formulario!: FormGroup;
  constructor(private fb: FormBuilder, private afs:FirebaseService, private authService:AuthService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      'mail': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  error:string = "";

  /** 
   *  Recoge el mail y la contraseña del formulario y ingresa en ese usuario, verificando que tenga el mail validado
   */
  enviar() {
    let correo = this.formulario.get('mail')?.value;
    let clave = this.formulario.get('password')?.value;

    this.authService.Ingresar(correo, clave)
    .then((result) => {
  
      console.info('RESULTADO', result);
      //si tiene el email verificado lo logueo, sino le aviso que no esta logueado
      if(result.user?.emailVerified)
      {
        this.authService.estaLogueado = true;
        this.authService.currentUser = {'correo': correo, 'clave': clave};    

        console.info('currentUser', this.authService.currentUser);  
        this.toastr.success('Ingreso con exito','Bienvenido', {
          timeOut:1500,
          closeButton:true
        })
      }
      else
      {
        this.toastr.warning('El email no esta verificado','Error', {
          timeOut:1500,
          closeButton:true
        });
      }
      //En Caso de que ponga una contraseña o mail invalidos, le muestro un toast generico
    }).catch((error) => {
      console.log(error);
      this.toastr.error('Credenciales invalidas','Error', {
        timeOut:1500,
        closeButton:true
      })
    });
    
  }

  ingresaEspecialista()
  {
    this.formulario.get('mail')?.setValue('especialista@especialista.com');
    this.formulario.get('password')?.setValue('especialista');
  }

  ingresaPaciente()
  {
    this.formulario.get('mail')?.setValue('paciente@paciente.com');
    this.formulario.get('password')?.setValue('paciente');
  }

  ingresaAdministrador()
  {
    this.formulario.get('mail')?.setValue('administrador@administrador.com');
    this.formulario.get('password')?.setValue('administrador');
  }


  // arrayEspecialistas:any = [];
  // traerEspecialistas()
  // {
  //   this.afs.LeerEspecialistas().subscribe((especialistas) => {
  //     this.arrayEspecialistas = [];
  //     especialistas.forEach((item: any) => {
  //       this.arrayEspecialistas.push({
  //         id: item.payload.doc.id,
  //         data: item.payload.doc.data()
  //       });
  //     })

  //     setTimeout(() => {
  //       console.info('Especialistas', this.arrayEspecialistas);
  //     }, 1500);
      
  //   });
  // }

  // arrayPacientes:any = [];
  // traerPacientes()
  // {
  //   this.afs.LeerPacientes().subscribe((pacientes) => {
  //     this.arrayPacientes = [];
  //     pacientes.forEach((item: any) => {
  //       this.arrayPacientes.push({
  //         id: item.payload.doc.id,
  //         data: item.payload.doc.data()
  //       });
  //     })

  //     setTimeout(() => {
  //       console.info('Pacientes', this.arrayPacientes);
  //     }, 1500);
      
  //   });
  // }
  

}
