import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthService } from 'src/app/services/auth.service';

import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public loading = false;

  urlImagen!:string;
  urlImagen2!:string;

  nuevoUsuario:any;

  public esPaciente:any = true;
  public formulario!: FormGroup;

  constructor(private fb: FormBuilder, private afs: FirebaseService, private storage: AngularFireStorage,
     private authService: AuthService, private router: Router, private toast:ToastrService) { 
  }

  ngOnInit(): void {
    // this.loading = true;
    // setTimeout(() => {
    //   this.loading = false;
    // }, 1000);

    if(!this.esPaciente)
    {
      this.formulario = this.fb.group({
        'nombre': ['', Validators.required],
        'apellido': ['', Validators.required],
        'edad': ['', [Validators.required, Validators.min(0), Validators.max(150)]],
        'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
        'mail': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.minLength(6)]],
        'especialidad': ['',],
        'imagen': [null, [Validators.required]]
      });
    }
    else
    {
      this.formulario = this.fb.group({
        'nombre': ['', Validators.required],
        'apellido': ['', Validators.required],
        'edad': ['', [Validators.required, Validators.min(0), Validators.max(150)]],
        'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
        'mail': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.minLength(6)]],
        'obrasocial': ['', Validators.required],
        'imagen': [null, [Validators.required]],
        'imagen2': [null, [Validators.required]]
      });
    }
  }


  async enviar()
  {
    console.info('FORMULARIO', this.formulario);
    console.info('STATUS', this.formulario.status);


    if(this.formulario.status == 'VALID')
    {
      this.loading = true;
      let formValue = this.formulario.getRawValue();
      
      let pathImg = `imagenes/especialistas/${formValue.dni}_${formValue.apellido}`;

      //Si es paciente, recoge tambien el archivo del input2, por lo que hay que crear referencias para este input tambien
      if(this.esPaciente)
      {
        pathImg = `imagenes/pacientes/${formValue.dni}_${formValue.apellido}`;
        let pathImg2 = `imagenes/pacientes/${formValue.dni}_${formValue.apellido}_2`;

        let inputFile2 : any = (<HTMLInputElement> document.getElementById("imagen2"));

        //Sube la imagen2
        await this.subirImagen(inputFile2, pathImg2, 2);
        console.info('IMANGEN2', this.urlImagen2);
      }
      let inputFile : any = (<HTMLInputElement> document.getElementById("imagen"));
      //esta imagen la sube en cualquiera de los casos
      await this.subirImagen(inputFile ,pathImg, 1);
    
      setTimeout(() => {
        console.info('Imagen1', this.urlImagen);

        if(this.esPaciente)
        {
          this.nuevoUsuario = {
            nombre: formValue.nombre,
            apellido: formValue.apellido,
            edad: formValue.edad,
            dni: formValue.dni,
            mail: formValue.mail,
            password: formValue.password,
            imagen: this.urlImagen,
            imagen2: this.urlImagen2,
            obrasocial: formValue.obrasocial
          }
        }
        else{
          this.nuevoUsuario = {
            nombre: formValue.nombre,
            apellido: formValue.apellido,
            edad: formValue.edad,
            dni: formValue.dni,
            mail: formValue.mail,
            password: formValue.password,
            imagen: this.urlImagen,
            especialidad: formValue.especialidad,
          }
        }
        this.Registrar();
        this.loading = false;
        this.toast.success('Se envio un mensaje para validar su correo', '', {
          timeOut:1500,
          closeButton:true
        })
      }, 1500);
    }
    else
    {
      this.toast.error('Hay datos invalidos en el formulario', 'ERROR', {
        timeOut:1500,
        closeButton:true
      });
    }
  }


  /** Sube un archivo a Storage y guarda sus referencias en variables
   * 
   * @param input El inputFile que va a subir
   * @param filePath El path donde va a guardar el archivo en el storage
   * @param num sirve para diferenciar en que variable guarda el link de referencia al archivo, dependiendo de cuantos archivos suba
   */
  async subirImagen(input:any, filePath:string, num:number)
  {
    let file = input.files[0];  //Recojo el archivo que haya subido el usuario

    let storageRef = this.storage.ref(filePath);
    
    await this.storage.upload(filePath, file);

    setTimeout(() => {
      storageRef.getDownloadURL().subscribe((url:any) => {
        if(num==1)
        {
          this.urlImagen = url;
          console.info('url', this.urlImagen);
        }
        else
        {
          this.urlImagen2 = url;
          console.info('url2', this.urlImagen2);
        }
      })
    }, 500);

  }
  

  /** Registra al usuario en firebase y le manda un mail para verificar el correo.
   *  Recoge el correo y contraseña del formulario para crear su cuenta en auth
   *  Luego agrega el usuario en firestore, en la coleccion correspondiente al tipo de usuario
   *  Finalmente le manda un mail para verificar la cuenta en auth.
   */
  async Registrar() {
    this.authService.Registrar(this.nuevoUsuario.mail , this.nuevoUsuario.password)
    .then(async (newUserCredential)=>{
      if(this.esPaciente)
      {
        this.afs.AgregarPaciente(this.nuevoUsuario).then(async()=>{
          console.log(newUserCredential);
          await newUserCredential.user?.sendEmailVerification(); 
        });
      }
      else
      {
        this.afs.AgregarEspecialista(this.nuevoUsuario).then(async()=>{
          console.log(newUserCredential);
          await newUserCredential.user?.sendEmailVerification(); 
        });
      }
    });
  }




}
